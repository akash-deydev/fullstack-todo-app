const TODO = require("../models/todo");

const handleGetAllTodosFromDB = async (req, res) => {
  const todos = await TODO.find({});
  res.status(200).json(todos);
};

const handleAddNewTaskToDb = async (req, res) => {
  const todo = req.body;
  if (!todo.task) {
    res.status(400).json({ error: "task field must have a value" });
  } else {
    const doc = await TODO.create({
      task: todo.task,
    });
    res.status(201).json({ status: "success", task: doc });
  }
};

const handleDeleteTaskFromDB = async (req, res) => {
  const id = req.params.taskId;
  await TODO.findByIdAndDelete(id);
  res.json({ status: "success" });
};

module.exports = {
  handleGetAllTodosFromDB,
  handleAddNewTaskToDb,
  handleDeleteTaskFromDB,
};
