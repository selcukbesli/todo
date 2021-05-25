const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  creator: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Todo", TodoSchema);
