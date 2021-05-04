const express = require("express");
const app = express();
const pool = require("./db");

app.use(express.json()); // => req.body (will allow us to get the Json Data )

// app.get('/dogs', function(request, response) {
//     return response.send('Dogs go brk brk');
//   });
//
// ROUTES

// get all todos
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (err) {
    console.log(err.message);
  }
});

// get a todo
//when you do a app.get("/todos/:id"  colon, you are able to acess it as a variable as req.params
//SO IN POSTMAN you would input something like this     GET     http://localhost:3000/todos/3 and
//find that single element like and array almost

app.get("/todos/:id", async (req, res) => {
  // console.log(req.params.id);
  const { id } = req.params;
  try {
    const todos = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      //same thing SELECT ALL FROM todo WHERE the todo_id is
      id,
    ]);
    res.json(todos.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

// create a todo
app.put("/todos", async (req, res) => {
  try {
    const { description } = req.body; //your looking for the description that you setup before
    const newTodo = await pool.query(
      //you INSERT INTO todo and WHERE description, with the value of $1
      "INSERT INTO todo (description) VALUES ($1) RETURNING *",
      [description]
    );
    // //await
    // console.log(req.body);
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});





// update a todo

// [
//   {
//     todo_id: 1,
//     description: "I need to clean my car",
//   },
//   {
//     todo_id: 3,
//     description: "I need to study for 4 hours minimum",
//   },
//   {
//     todo_id: 4,
//     description: "I need to study for 4 hours minimum",
//   },
//   {
//     todo_id: 2,
//     description: "I need to eat dinner",
//   },
// ];


// so if you wanted to change todo_id: 3 you would do http://localhost:3000/todos/3 and change
//   the description: "I need to walk Apollo" or whatever you want to change it to

app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params; //WHERE
    const { description } = req.body; //SET

    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      //$1 is the description and , $2 is the id
      [description, id]
    );
    // //await
    // console.log(req.body);
    res.json("Todo was updated successfully");
  } catch (err) {
    console.error(err.message);
  }
});

// delete a todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json("Todo was deleted successfully");
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(3000, function () {
  console.log("App on port 3000");
});

////////////////NOTES///////////

//touch index.js sets up the file right away in terminal

// psql Common Commands
// \l — List all databases
// \c DB_NAME — connect to DB_NAME
// \dt —- List all tables (in current db)
// \d TABLE_NAME — Get details about TABLE_NAME (in current db)
// \q — Quit psql (can also type <Control-D>)
// Juans-Air:PG-BASIC juancruz$ psql -U postgres

// Databases
// List databases
// \l
// Copy to clipboardErrorCopied
// // List all databases using \l (or \list) (psql)

// List databases
// \l+
// Copy to clipboardErrorCopied
// // List all databases using \l+ with more details (including description, tablespace & DB size) (psql)

// Help on CREATE DATABASE command syntax
// \h CREATE DATABASE

// Create database
// CREATE DATABASE mytest;
// Copy to clipboardErrorCopied
// // Creates a new database “mytest” (SQL)

// By default, the owner of the database is the current login user.

// Create database
// \c test
// You are now connected to database "test" as user "postgres".
// Copy to clipboardErrorCopied
// // Connect to a PostgreSQL database “test” as “postgres” user (psql)

// Tables
// Show table
// \d TABLE_NAME
// Copy to clipboardErrorCopied
// Show table definition including indexes, constraints & triggers (psql)

// Show details
// \d+ TABLE_NAME
// Copy to clipboardErrorCopied
// // More detailed table definition including description and physical disk size (psql)

// List tables from current schema
// \dt
// Copy to clipboardErrorCopied
// // List tables from current schema (psql)

// List tables from all schemas
// \dt *.*
// Copy to clipboardErrorCopied
// // List tables from all schemas (psql)

// List tables for a schema
// \dt <name-of-schema>.*
// Copy to clipboardErrorCopied
// // List the tables in a specific schema (psql)

// Copy table data to CSV file
// \copy (SELECT * FROM __table_name__) TO 'file_path_and_name.csv' WITH CSV
// Copy to clipboardErrorCopied
// // Export a table as CSV (psql)

// Check indexes for a table using sql
// SELECT * FROM pg_indexes WHERE tablename='__table_name__' AND
// schemaname='__schema_name__';
// Copy to clipboardErrorCopied
// // Show table indexes (SQL)

// Collects statistics about the contents of tables
// ANALYZE [__table__]
// Copy to clipboardErrorCopied
// // Analyze a table and store the results in the pg_statistic system catalog (SQL)

// With no parameter, ANALYZE examines every table in the current database

// Adding comment on table/column
// Comment on table employee is 'Stores employee records';
// Copy to clipboardErrorCopied
// // Comment on table (SQL)

// Comment on column employee.ssn is 'Employee Social Security Number';
// Copy to clipboardErrorCopied
// // Comment on column (SQL)

// Approximate Table Row count / Table Cardinality
// SELECT reltuples AS card FROM pg_class WHERE relname = '<table_name>';
// Copy to clipboardErrorCopied
// // Use this to do fast (but not exact) counts from tables. Helpful if table has millions / billions of records and you just want estimated rows quickly. (SQL)

// pg
// Similar to psycopg2 with python
// Allows us to establish a connection to a database and execute SQL
// $ npm install pg

// Using pg
// It’s common to abstract this logic to another file, so let’s create a file db.js:

// demo/simple/db.js
// /** Database setup for users. */

// const { Client } = require("pg");

// let DB_URI;

// if (process.env.NODE_ENV === "test") {
//   DB_URI = "postgresql:///users_test";
// } else {
//   DB_URI = "postgresql:///users";
// }

// let db = new Client({
//   connectionString: DB_URI
// });

// db.connect();

// module.exports = db;