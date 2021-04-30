const express = require("express");
const app = express();
const pool = require("pool");

app.use(express.json());

//ROUTES//

//get all todos

// get a todo

// Create a todo

// Update a todo

// Delete a todo

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
