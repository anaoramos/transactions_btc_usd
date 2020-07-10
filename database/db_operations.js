const { Pool, Client } = require("pg");



const database_name = 'anaramos';

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: database_name,
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

    //insert_value("account", "btc", "1")
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

    _init() {
        var db_name = 'anaramosx';
        var table_name = 'account';
        var values_table = 'btc VARCHAR(255)';

        try {
            //Create Database
            postgresOperations.verifyDatabase(db_name).then(function (rows_number) {
                if (rows_number > 0) {
                    console.log('Database already exists.');
                }
                else {
                    postgresOperations.create_database(db_name).then(function (response) {
                        console.log(response)
                    })
                }

                //Create Table
                postgresOperations.create_table(table_name, values_table).then(function (response) {
                    console.log(response);
                    return console.log("Database Status: OK");
                })


            });
        }
        catch (error) { console.error(error) };
    }
}


var postgresOperations = new PostgresOperations();

module.exports = postgresOperations;
