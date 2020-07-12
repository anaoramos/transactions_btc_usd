var request = require('request');


class UpholdRequests {


  doRequest(url, method, callback) {
    // Set the headers
    var headers = {
      'Content-Type': "application/json"
    }
    // Configure the request
    var options = {
      url: url,
      method: method,
      headers: headers
    }

    // Start the request
    request(options, function (error, response, body) {
      if (error) {
        console.error('Problem making network call: ', error);
        callback(error, response, body);
      }
      if (!error && response.statusCode === 200) {
        //console.log('Request Status : OK')
        body = JSON.parse(body);
        callback(error, response, body);
      }
    })
  }


  getTicker_pair(url, callback) {
    this.doRequest(url, 'GET', function (error, response, body) {
      if (error) {
        console.error(error);
      } else {
        callback(error, response, body)
      } })
  }

  doTransaction(currency, amount_to_send, origin, destination_) {
    /* --------
    This method simulates that we send a POST request to the following url (specifying: 'currency', 'amount', 'origin', 'destination'):

    https://api.uphold.com/v0/me/cards/:card/transactions

    It should return a Transaction Object. In this case, just log 'Transaction completed!'
   -------- */
    console.log('Transaction completed!');

  }





}
var upholdRequests = new UpholdRequests();

module.exports = upholdRequests;