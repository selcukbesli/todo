const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");

// CREATE
router.post("/", (req, res) => {
  // console.log(req.body);
  const todo = new Todo({
    name: req.body.name,
    completed: req.body.name,
    created: req.body.name,
  });

  todo
    .save()
    .then((data) => res.json(data))
    .catch((err) => res.json({ msg: err }));
});

// READ
router.get("/", (req, res) => {
  // res.send("to do list");
  Todo.find()
    .then((data) => res.json(data))
    .catch((err) => res.json({ msg: err }));
});

router.get("/:todoId", (req, res) => {
  Todo.findById(req.params.todoId)
    .then((data) => res.json(data))
    .catch((err) => res.json({ msg: err }));
});

// UPDATE
router.put("/:todoId", (req, res) => {
  console.log(req.body);
  Todo.findByIdAndUpdate(req.params.todoId, req.body, { new: true })
    .then((data) => res.json(data))
    .catch((err) => res.json({ msg: err }));
});

//DELETE
router.delete("/:todoId", (req, res) => {
  Todo.findByIdAndRemove(req.params.todoId)
    .then((data) => res.json(data))
    .catch((err) => res.json({ msg: err }));
});

module.exports = router;
