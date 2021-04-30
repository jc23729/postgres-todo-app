const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  database: "todo_database",
  host: "localhost",
  port: 5432,
});

module.exports = pool;


/** Database setup other method */

// const { Client } = require("pg");

// const client = new Client({
//   // connectionString: "postgresql:///biztime"
//   user: "postgres",
//   database: "biztime",
//   host: "localhost",
//   port: 5432,
// });

// client.connect();

// module.exports = client;
