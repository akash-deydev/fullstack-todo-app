const express = require('express');
const {handleGetAllTodosFromDB, handleAddNewTaskToDb, handleDeleteTaskFromDB} = require("../controllers")

const todoRoute = express.Router();

todoRoute.get("/", handleGetAllTodosFromDB).post(handleAddNewTaskToDb)

todoRoute.delete("/:taskId", handleDeleteTaskFromDB)


module.exports = todoRoute