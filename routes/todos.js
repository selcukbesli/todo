const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");
const auth = require("../middleware/auth");

// CREATE A TODO
router.post("/", (req, res) => {
  const todo = new Todo({
    name: req.body.name,
    creator: req.body.creator,
  });

  todo
    .save()
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json({ msg: err }));
});

// FETCH ALL TODOS
router.get("/:userId", (req, res) => {
  // console.log(req.user.id || req.user.sub);

  // console.log(req.user);
  // res.send("to do list");
  // console.log(req.params);
  Todo.find({ creator: req.params.userId })
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json({ msg: err }));
});

// GET A  TODO

// router.get("/:todoId", (req, res) => {
//   Todo.findById(req.params.todoId)
//     .then((data) => res.status(200).json(data))
//     .catch((err) => res.status(400).json({ msg: err }));
// });

// UPDATE A TODO
router.put("/:userId/:todoId", (req, res) => {
  Todo.findByIdAndUpdate(req.params.todoId, req.body, { new: true })
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json({ msg: err }));
});

// DELETE A TODO
router.delete("/:userId/:todoId", (req, res) => {
  Todo.findByIdAndRemove(req.params.todoId)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json({ msg: err }));
});

// DELETE COMPLETED TODOS
router.delete("/:userId/:todoId/deleteCompleted", (req, res) => {
  Todo.deleteMany({ completed: true })
    .then((data) => res.json({ deletedCount: data.deletedCount }))
    .catch((err) => res.json({ msg: err }));
});

module.exports = router;
