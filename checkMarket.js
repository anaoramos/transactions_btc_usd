var create_db = require('./database/db_operations');
const uphold = require('./upholdRequests');

var expense;
var timeOut_id;


var ticker_USDBTC = 'https://api.uphold.com/v0/ticker/USD-BTC';
var ticker_BTCUSD = 'https://api.uphold.com/v0/ticker/BTC-USD';
var idTimeout;

class CheckMarket {
     checkProfit() {
        uphold.getTicker_pair(ticker_BTCUSD, function (error, response, body_sell) {
            //var ask = body.ask;
            var revenue = body_sell.bid; //preco max que comprador paga
            var profit = revenue - expense;
            profit = profit / revenue * 100;

            if (profit < 5) {
                console.log('Profit of ', profit, '%. No action pesrformed.');
            }
            else {
                console.log('Profit of ', profit, '%. Moving 1 BTC to USD.');
                clearTimeout(timeOut_id);
            }
        });
    }

    setInter( obj, time_){
        var oldSI = setTimeout;
        setInterval = function (fn, delay) {
            var id = oldSI(fn, delay);
            idTimeout = id;
            return id;
          };
        setTimeout(obj, time_);

    }

    clearTimeout(id) {   
        var oldCT = clearTimeout;
    
        clearTimeout = function (id) {
          oldCT(id);
          idTimeout = null;
        };
    
        clearTimeout(id);
        

      }

    firstPurchase() {
        //create_db.create_db();
        //create_db.create_table('account', 'btc VARCHAR(255)');
        uphold.getTicker_pair(ticker_USDBTC, function (error, response, body) {
            var ask = body.ask;
            expense = 1 / ask;
            console.log('Buying 1 BTC...\nPrice:', expense, 'USD');
            //reate_db.insert_value('account', 'btc', '1')
         
            this.setInter(checkProfit, 5000);

        });
    }





}

var checkMarket = new CheckMarket();
  
module.exports = checkMarket;

