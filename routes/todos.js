const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");
const auth = require("../middleware/auth");

// CREATE A TODO
router.post("/", auth, (req, res) => {
  const todo = new Todo({
    name: req.body.name,
  });

  todo
    .save()
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json({ msg: err }));
});

// FETCH ALL TODOS
router.get("/", (req, res) => {
  // res.send("to do list");
  Todo.find()
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json({ msg: err }));
});

// GET A  TODO

router.get("/:todoId", (req, res) => {
  Todo.findById(req.params.todoId)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json({ msg: err }));
});

// UPDATE A TODO
router.put("/:todoId", (req, res) => {
  Todo.findByIdAndUpdate(req.params.todoId, req.body, { new: true })
    .then((data) => res.status(200).json(data))
    .catch((err) => rPes.status(400).json({ msg: err }));
});

//DELETE A TODO
router.delete("/:todoId", auth, (req, res) => {
  Todo.findByIdAndRemove(req.params.todoId)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json({ msg: err }));
});

module.exports = router;
