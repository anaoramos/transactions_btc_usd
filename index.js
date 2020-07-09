
var create_db = require('./database/db_operations');

const checkMarket = require('./checkMarket');


checkMarket.firstPurchase();
//checkMarket.checkProfit();

create_db.verifyDatabase()



