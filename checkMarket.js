var create_db = require('./database/db_operations');
const uphold = require('./upholdRequests');

var expense;
var timeOut_id;


var ticker_USDBTC = 'https://api.uphold.com/v0/ticker/USD-BTC';
var ticker_BTCUSD = 'https://api.uphold.com/v0/ticker/BTC-USD';
var idTimeout;

class CheckMarket {

    checkProfit(profit_per) {
        if (profit_per < 5) {
            return null;
        }
        else {
            clearTimeout(idTimeout);
            return 0;
        }
    }

    sellMoney() {
        var this_ = this;
        
        
        uphold.getTicker_pair(ticker_BTCUSD, function (error, response, body_sell) {
            //var ask = body.ask;
            var revenue = body_sell.bid; //preco max que comprador paga
            console.log(body_sell);
            console.log('1BTC price: ', revenue, 'USD')
            var profit = revenue - expense;
            profit = profit / revenue * 100;
            var action = checkMarket.checkProfit(profit);
            if (action){
                console.log('Profit of ', profit, '%. Moving 1 BTC to USD.');
            }
            else {
                console.log('Profit of ', profit, '%. No action performed.');
            }
            
            
        });
    }

    firstPurchase() {
        var this_=this;
        create_db.create_db();
        //create_db.create_table('account', 'btc VARCHAR(255)');
        uphold.getTicker_pair(ticker_USDBTC, function (error, response, body) {
            var ask = body.ask;
            expense = 1 / ask;
            console.log('Buying 1 BTC...\nPrice:', expense, 'USD');
            //reate_db.insert_value('account', 'btc', '1')
          
            idTimeout =  setInterval(this_.sellMoney, 5000);

        });
    }





}

var checkMarket = new CheckMarket();
  
module.exports = checkMarket;

