
var create_db = require('./database/create_db');

const uphold = require('./upholdRequests');
var ticker_USDBTC = 'https://api.uphold.com/v0/ticker/USD-BTC';



uphold.getTicker_pair(ticker_USDBTC, function (error, response, body) {
    var ask = body.ask;
    var price = 1/ask;
    console.log('will buy 1 BTC price: ', price);

    
});




create_db
