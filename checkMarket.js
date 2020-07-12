var postgresOperations = require('./database/db_operations');
const uphold = require('./upholdRequests');
const config = require('./configs');
var ticker_BTCUSD = 'https://api.uphold.com/v0/ticker/BTC-USD';
var idTimeout;

var _price;



class CheckMarket {
    checkProfit(profit_per) {
        if (profit_per < 5) {
            return false;
        }
        else {
            clearTimeout(idTimeout);
            return true;
        }
    }


    calculateProfit(ask, bid, price) {
        var spread = ask - bid;
        var selling_price = ask - spread / 5; 
        console.log('I am selling 1BTC for ', selling_price, 'USD');
        var gross_profit = selling_price - price;
        var gross_margin = gross_profit / selling_price;
        var gross_profit_margin = gross_margin * 100;
        return [gross_profit_margin, selling_price];
    }


    sellMoney() {
        uphold.getTicker_pair(ticker_BTCUSD, function (error, response, body) {
            var [profit, selling_price] = checkMarket.calculateProfit(Number(body.ask), Number(body.bid), _price);
            var action = checkMarket.checkProfit(profit);
            if (action == true) {
                console.log('Profit of ', profit, '%. Moving 1 BTC to USD.');

                postgresOperations.select_last_row(config.table_name, '(card_id, btc_cash, usd_balance)', 'timestamp').then((response) => {
                    response = (response.replace('(', '')).replace(')', '');
                    response = response.split(',');
                    var card_id = response[0];
                    var amount_to_send = 1;
                    var btc_cash = response[1] - amount_to_send;
                    var balance = Number(response[2]) + selling_price;

                    postgresOperations.insert_value(config.table_name, 'card_id, btc_cash, usd_balance, destination, timestamp', [card_id, btc_cash, balance, "'" + config.transaction_destination + "'", Date.now()]).then((response) => {
                        console.log(response);
                        uphold.doTransaction("'USD'", amount_to_send, card_id, config.transaction_destination);
                        checkMarket.buyMoney();
                    });
                })
            }
            else {
                console.log('Profit of ', profit, '%. No action performed.');
            }
        });
    }


    buyMoney() {
        var this_ = this;
        uphold.getTicker_pair(ticker_BTCUSD, function (error, response, body) {

            var bid = Number(body.bid);
            var ask = Number(body.ask);
            var spread = ask - bid;
            /*
            "In theory, it’s fine to just bid one cent above the bid price. 
            In practice however, in the time between checking the bid price and submitting your order, 
                the bid price will often change. 
            To ensure that your order sits higher than all of the other buy orders, 
                and so sets the new bid price, it’s often advisable to bid 5–10 ¢ above the current bid price."
            */
            _price = bid + (spread / 2);

            console.log('Buying 1 BTC...  Price:', _price, 'USD');

            var amount_to_buy = 1;

            postgresOperations.select_last_row(config.table_name, '(card_id, btc_cash, usd_balance)', 'timestamp').then((response) => {
                response = (response.replace('(', '')).replace(')', '');
                response = response.split(',');
                var card_id = response[0];

                var btc_cash = response[1] + amount_to_buy;
                var balance = Number(response[2]) - _price;
                postgresOperations.insert_value(config.table_name, 'card_id, btc_cash, usd_balance, destination, timestamp', [card_id, btc_cash, balance, "'-'", Date.now()]).then((response) => {
                    //console.log(response);
                    idTimeout = setInterval(this_.sellMoney, 5000);
                });
            })
            
        });
    }
}

var checkMarket = new CheckMarket();
module.exports = checkMarket;

