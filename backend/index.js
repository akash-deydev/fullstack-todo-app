const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const app = express();

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Include cookies in CORS requests if needed
  optionsSuccessStatus: 204, // Return a 204 status code for preflight requests
};



app.use(cors(corsOptions));
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/todo-app")
  .then(() => {
    console.log("Db Connected");
  })
  .catch((error) => {
    console.log(error.message);
  });

const todoSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const TODO = mongoose.model("Todo", todoSchema);

app.get("/", async(req, res) => {
  const todos = await TODO.find({})
  res.status(200).json(todos)
});

app.post("/", async (req, res) => {
  const todo = req.body;
  if (!todo.task) {
    res.status(400).json({ error: "task field must have a value" });
   } 
  else {
    const doc = await TODO.create({
      task: todo.task
    })
    res.status(201).json({status: "success", task: doc})
  }
});

app.delete("/:taskId", async (req, res) => {
  const id = req.params.taskId
  await TODO.findByIdAndDelete(id)
  res.json({status: "success"})
})

app.listen(3002, () => {
  console.log("Server started at port 3002");
});
