
const postgresOperations = require('./database/db_operations');

const checkMarket = require('./checkMarket');





// init()
postgresOperations._init();
checkMarket.buyMoney();







