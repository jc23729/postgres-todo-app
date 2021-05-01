const express = require("express");
const app = express();
const pool = require("pool");


app.use(express.json()); // =>req.body

//ROUTES//

//get all todos

// get a todo

  // create a todo
app.put('/todos', async (req, res) => {
  try{
    const {description} = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES ($1) RETURNING *",
      [description]
    );
    // //await
    // console.log(req.body);
    res.json(newTodo.rows[0]);

  }catch(err){
    console.error(err.message);
  }
});
// Update a todo

// Delete a todo

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
