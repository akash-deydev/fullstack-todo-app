const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    task: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  })

  const TODO = mongoose.model("Todo", todoSchema);

  module.exports = TODO;