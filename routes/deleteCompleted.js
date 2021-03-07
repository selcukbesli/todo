const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");

// DELETE COMPLETED TODOS
router.delete("/", (req, res) => {
  Todo.deleteMany({ completed: true })
    .then((data) => res.json({ deletedCount: data.deletedCount }))
    .catch((err) => res.json({ msg: err }));
});

module.exports = router;
