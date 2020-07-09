
const uphold = require('../upholdRequests');
const checkMarket = require('../checkMarket');


describe("checkProfit function", () => {
    // test stuff

    test("Testing check profit < 5", () => {
      expect(checkMarket.checkProfit(4)).toEqual(null);
     

    });
      test("Testing check profit > 5", () => {
        expect(checkMarket.checkProfit(5)).toEqual(0);

      });
  });