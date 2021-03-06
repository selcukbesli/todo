const express = require("express");
// const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const auth = require("./middleware/auth");

const app = express();
const PORT = process.env.PORT || 3001;
const todoRoutes = require("./routes/todos");
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");

require("dotenv").config();

// Middlewares
app.use(cors());
// app.use(bodyParser.json());
app.use(express.json());
app.use("/api/todos", auth, todoRoutes);
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

//Home Route
// app.get("/api", (req, res) => {
//   res.send("todo Homepage");
// });

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

// Serve Static assets in production for HEROKU
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
