# Transactions BTC-USD

This project uses the Uphold API to create a bot that can move money between BTC and USD. The transactions are not actually carried out, only the intent is logged.



## Getting Started

Start the bot. It will buy 1 BTC and wait for the best opportunity to sell it (5% profit). Once the BTC has been sold, it buys 1 BTC again.

The transactions are registered in Postgres. You can define the database and table names in the config.js file. The default names are "transactions" and "wallet".

### Prerequisites
You should have Postgres installed. The bot transactions are registered in a Postgres database.


### Installing
In the project directory, you can run:

### `npm start`


## Running the tests
In the project directory, you can run:

### `npm test`

Starts the test runner (with Jest). <br>


## Authors

* **Ana Ramos** - *Initial work* - [anaoramos](https://github.com/anaoramos)


## Learn More

You can learn more in the [Uphold API documentation](https://uphold.com/en/developer/api/documentation/).
