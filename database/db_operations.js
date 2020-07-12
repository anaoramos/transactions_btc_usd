const { Pool, Client } = require("pg");
const config = require('../configs')


const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: config.database_name,
    password: "1234",
    port: "5432"
});


class PostgresOperations {

    async verifyDatabase(name) {
        let response;
        try {
            var query = "SELECT datname FROM pg_catalog.pg_database WHERE datname='" + name + "'";

            response = await new Pool().query(query);
            return response.rowCount
        }
        catch (error) {
            console.error(error)
        };
    }


    async create_database(database_name) {
        let response;
        try {
            var query = "CREATE DATABASE " + database_name;
            response = await new Pool().query(query);
            return "Database Created."
        }
        catch (error) {
            console.error(error)
        };

    }


    async create_table(name, parameters) {

        let response;
        try {
            var query = "CREATE TABLE IF NOT EXISTS " + name + "(" + parameters + ")";
            response = await pool.query(query);
            return "Table created."
        }
        catch (error) {
            console.error(error)
        };
    }

    async insert_value(table_name, parameters_name, values) {

        let response;
        try {
            var query = "INSERT INTO " + table_name + "(" + parameters_name + ")VALUES(" + values + ")";
            response = await pool.query(query);
            return "Registed in the database."
        }
        catch (error) {
            console.error(error)
        };
    }

    async select_last_row(table_name, parameters_to_select, colums_to_order) {

        let response;
        try {
            var query = "SELECT (" + parameters_to_select + ") FROM " + table_name + " ORDER BY " + colums_to_order + " DESC LIMIT 1";
            response = await pool.query(query);
            response = response.rows[0];
            return response.row;
        }
        catch (error) {
            console.error(error)
        };

    }

    _init() {
        try {
            //Create Database
            postgresOperations.verifyDatabase(config.database_name).then(function (rows_number) {
                if (rows_number > 0) {
                    //console.log('Database already exists.');
                    postgresOperations.create_table(config.table_name, 'card_id NUMERIC, btc_cash NUMERIC, usd_balance NUMERIC, destination VARCHAR(255), timestamp NUMERIC').then(function (response) {
                        //console.log(response);
                        postgresOperations.insert_value(config.table_name, 'card_id, btc_cash, usd_balance, destination, timestamp', [config.account_id, 0, 0, "'-'", Date.now()]).then((response) => {
                            //console.log(response);
                            return console.log("Database Status: OK");
                        });
                    })
                }
                else {
                    postgresOperations.create_database(config.database_name).then(function (response) {
                        //console.log(response);
                        postgresOperations.create_table(config.table_name, 'card_id NUMERIC, btc_cash NUMERIC, usd_balance NUMERIC, destination VARCHAR(255), timestamp NUMERIC').then(function (response) {
                            //console.log(response);
                            postgresOperations.insert_value(config.table_name, 'card_id, btc_cash, usd_balance, destination, timestamp', [config.account_id, 0, 0, "'-'", Date.now()]).then((response) => {
                                //console.log(response);
                                return console.log("Database Status: OK");
        
                            });
        
                        })
                    })
                }
            });
        }
        catch (error) { console.error(error) };
    }
}


var postgresOperations = new PostgresOperations();

module.exports = postgresOperations;
