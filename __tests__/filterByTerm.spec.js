
const uphold = require('../upholdRequests');
const checkMarket = require('../checkMarket');
const database = require('../database/db_operations');
const { Pool } = require('pg');

describe("checkProfit function", () => {
    // test stuff

    test("Testing check profit < 5", () => {
      expect(checkMarket.checkProfit(4)).toEqual(null);
     

    });
      test("Testing check profit > 5", () => {
        expect(checkMarket.checkProfit(5)).toEqual(0);

      });
  });

  describe("function check if existes databse", () => {
    // test stuff


    test("Testing database named anaramos (exists on my postgres)", () => {
      return database.verifyDatabase('anaramos').then(data => expect(data).toEqual(1));
    });

    test("Testing database named xxxx (does not exists on my postgres)", () => {
      return database.verifyDatabase('xxxx').then(data => expect(data).toEqual(0));
    });
     
  });

  describe("function check if existes table", () => {
    // test stuff


    test("Testing table named account (exists on my postgres)", () => {
      return database.verifyDatabase('anaramos').then(data => expect(data).toEqual(1));
    });

    test("Testing database named xxxx (does not exists on my postgres)", () => {
      return database.verifyDatabase('xxxx').then(data => expect(data).toEqual(0));
    });

    test("Testing create a table if does not exists", () => {
      
      return database.create_table('account', 'btc VARCHAR(255)').then(data => expect(data).toEqual(console.log('Table created.')));
    });

    test("Testing insert a value on a table", () => {
      
      return database.insert_value('account', 'btc', '1').then(data => expect(data).toEqual(console.log('Value inserted.')));
    });


  });