const express = require("express");
const app = express();
const pool = require("pool");
const { Client } = require("pg");

app.use(express.json()); // =>req.body

//ROUTES//

//get all todos

// get a todo

// Create a todo
app.post("/todos", async (req, res) => {
  try {
    //await
    console.log(req.body);
  } catch (err) {
    console.error(err.message);
  }
});

// Update a todo

// Delete a todo

app.listen(3000, () => {
  console.log("Listening on port 3000");
})
