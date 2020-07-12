# Transactions BTC-USD

This project uses the Uphold API to create a bot that can move money between BTC and USD. <br>
The transactions are not actually carried out, only the intent is logged.


To start the bot, it buys 1 BTC and waits for the best opportunity to sell it (5% profit). Once the BTC has been sold, it buys 1 BTC again.<br>
The transactions are registered in Postgres. You can define the database and table names in the config.js file. The default names are "transactions" and "wallet".


## Getting Started

### Prerequisites
You should have Postgres installed. The bot transactions are registered in a Postgres database.


### Starting
In the project directory, you can run:

### `npm start`


## Running the tests
In the project directory, you can run:

### `npm test`

Starts the test runner (with Jest). <br>


## Authors

* **Ana Ramos** - [anaoramos](https://github.com/anaoramos)


## Learn More

You can learn more in the [Uphold API documentation](https://uphold.com/en/developer/api/documentation/).
