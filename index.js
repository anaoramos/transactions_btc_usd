
var create_db = require('./database/db_operations');

const uphold = require('./upholdRequests');
var ticker_USDBTC = 'https://api.uphold.com/v0/ticker/USD-BTC';
var ticker_BTCUSD = 'https://api.uphold.com/v0/ticker/BTC-USD';

const express = require('express');
const http = require('http');
const hostname = 'localhost';
const port = 3000;
const app = express();


const server = http.createServer(app);
/*
server.listen(port, hostname, () => {

    

    console.log(`Running at http://${hostname}:${port}`);
});

*/



var price;
var initial_bid;
var initial_ask; 

var timeOut_id;
function calculate_profit() {
    uphold.getTicker_pair(ticker_BTCUSD, function (error, response, body) {
        //var ask = body.ask;
        var bid = body.bid; //preco max que comprador paga
        console.log(body.ask);
        var lucro = bid - price;
        console.log('lucro ', lucro)
        var profit = lucro/bid*100;

        if (profit < 5){
            console.log('Profit of ', profit, '%. No action performed.') ;
            
        }
        else {
            console.log('Profit of ', profit, '%. Moving 1 BTC to USD.') ;
            clearTimeout(timeOut_id);
        }
        
         
    });
    
}





//create_db.create_db();
//create_db.create_table('account', 'btc VARCHAR(255)');
uphold.getTicker_pair(ticker_USDBTC, function (error, response, body) {
    initial_ask = body.ask;
    initial_bid = body.bid;
    price = 1/initial_ask;
    console.log('Buying 1 BTC...\nPrice:', price,'USD') ;
    //reate_db.insert_value('account', 'btc', '1')

    timeOut_id = setInterval(calculate_profit, 5000);
  
        //var obj = { session_id: dialogflow_session_id, timeOut: id }
       

    

});

