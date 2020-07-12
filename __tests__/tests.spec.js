
const checkMarket = require('../checkMarket');
const database = require('../database/db_operations');

describe("Test the method of calculating the percentage of profit", () => {
  var ask = 9239;
  var bid = 9298;

  test("Test a purchase price of $10,000 per 1 BTC", () => {
    expect(checkMarket.calculateProfit(ask, bid, 10000)).toEqual(-8.098759026246388);


  });
  test("Test a purchase price of $0 per 1 BTC", () => {
    expect(checkMarket.calculateProfit(ask, bid, 0)).toEqual(100);

  });
});


describe("Test the verification method to proceed with the transaction.", () => {

  test("Test with a 3% profit", () => {
    expect(checkMarket.checkProfit(3)).toEqual(false);

  });
  test("Test with a 6% profit", () => {
    expect(checkMarket.checkProfit(6)).toEqual(true);
  });
});


describe("Test the method for checking whether a specific database exists in Postgres.", () => {

  test("Testing a database that is in my postgres. (Use the 'transactions' database", () => {
    return database.verifyDatabase('transactions').then(data => expect(data).toEqual(1));
  });

  test("Testing a database that is not in my postgres. (Use the 'xxxx' database", () => {
    return database.verifyDatabase('xxxx').then(data => expect(data).toEqual(0));
  });
});


describe("Test the method of creating a table in Postgres.", () => {
  test("Test creating a table named 'xxxx'", () => {
    return database.create_table('xxxx', 'value VARCHAR(255)').then(data => expect(data).toEqual('Table created.'));
  });

});


describe("Test the method of inserting values ​​into a table in Postgres.", () => {
      test("Insert a value in the 'xxxx' table", () => { 
        return database.insert_value('xxxx', 'value', '1').then(data => expect(data).toEqual('Registed in the database.'));
      });
  

});