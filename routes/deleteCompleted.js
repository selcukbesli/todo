const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");

// DELETE MANY
router.delete("/", (req, res) => {
  Todo.deleteMany({ completed: true })
    .then((data) => res.json(data))
    .catch((err) => res.json({ msg: err }));
});

module.exports = router;
