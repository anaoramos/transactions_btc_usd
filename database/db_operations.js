const { Pool, Client } = require("pg");
const uphold = require('../upholdRequests');

const database_name = 'anaramos';

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: database_name,
    password: "1234",
    port: "5432"
});


class PostgresOperations {

    verifyDatabase(callback) {
        var query = "SELECT datname FROM pg_catalog.pg_database WHERE datname='"+ database_name+"'";
        
        new Pool().query(
            query,
            (err, res) => {
                callback(err, res.rowCount);
            }
        );
    }
    

    create_db() {
        this.verifyDatabase(function(err, rows_number) {
            console.log('fff', rows_number)
            if (rows_number > 0) {
                console.log('Database '+database_name+ ' already exists.');
            }
            else {
                var query = "CREATE DATABASE " + database_name;
                new Pool().query(
                    query,
                    (err, res) => {
                        console.log(err, res);
                     
                        //pool.end();
                    }
                );
            }  

        })
        
    }

    create_table(name, parameters) {

        var query = "CREATE TABLE " + name + "(" + parameters + ")";
        console.log(query);
        pool.query(
            query,
            (err, res) => {
                if (err){console.error(err)};
                //pool.end();
            }
        );
    }

    //insert_value("account", "btc", "1")
    insert_value(table_name, parameters_name, values) {
        var query = "INSERT INTO " + table_name + "(" + parameters_name + ")VALUES(" + values + ")"
        pool.query(
            "INSERT INTO account( btc )VALUES('1')",
            (err, res) => {
                if (err){console.error(err)};
                pool.end();
            }
        );
    }
}


var postgresOperations = new PostgresOperations();
  
module.exports = postgresOperations;

/*
pool.query(
    "CREATE TABLE account(btc VARCHAR(255));",
    (err, res) => {
      console.log(err, res);
      //pool.end();
    }
  );

var price = 1/ask;
console.log('will buy 1 BTC price: ', price),
pool.query(
    "INSERT INTO account( btc )VALUES('1')",
    (err, res) => {
    console.log(err, res);
    pool.end();
  }
);
*/
