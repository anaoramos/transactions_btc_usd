
var create_db = require('./database/db_operations');

const checkMarket = require('./checkMarket');


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

checkMarket.firstPurchase();
//checkMarket.checkProfit();



