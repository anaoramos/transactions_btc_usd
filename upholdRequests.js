var request = require('request');

var ticker_USDBTC = 'https://api.uphold.com/v0/ticker/USD-BTC';

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
    

  getTicker_pair(url, callback){
      this.doRequest(url, 'GET', function (error, response, body) {
            if (error) {
                console.error(error);  
            } else {
                callback(error, response, body)
        }
      
    })}




   }        
  var upholdRequests = new UpholdRequests();
  
  module.exports = upholdRequests;