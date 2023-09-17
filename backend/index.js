const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const todoRouter = require("./routes/todo")

const port = 3002

const app = express();

const corsOptions = {
  origin: ['https://fullstack-todo-app-blue.vercel.app'],
  methods: ['GET', 'POST', 'DELETE'],
  credentials: true, // Include cookies in CORS requests if needed
  optionsSuccessStatus: 204, // Return a 204 status code for preflight requests
};



app.use(cors(corsOptions));
app.use(express.json());

app.use("/", todoRouter);

mongoose
  .connect("mongodb+srv://akashdeydev:nDt7KGJKAt6R7T8h@todocluster.gvy5uvn.mongodb.net/")
  .then(() => {
    console.log("Db Connected");
  })
  .catch((error) => {
    console.log(error.message);
  });


app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
