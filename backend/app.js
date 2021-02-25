const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = 3001;
const todoRoutes = require("./routes/todos");
const deleteCompletedRoutes = require("./routes/deleteCompleted");

require("dotenv").config();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use("/todos", todoRoutes);
app.use("/deleteCompleted", deleteCompletedRoutes);

//Home Route
app.get("/", (req, res) => {
  res.send("todo Homepage");
});

// Mongoose Connnection
mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Mongooose Connection Status Check
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to mongoDB with mongoose");
});

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
