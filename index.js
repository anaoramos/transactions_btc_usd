
const postgresOperations = require('./database/db_operations');

const checkMarket = require('./checkMarket');




var db_name = 'anaramos';
var table_name = 'account';
var values_table = 'btc VARCHAR(255)';






postgresOperations._init();

checkMarket.firstPurchase();
//checkMarket.checkProfit();






