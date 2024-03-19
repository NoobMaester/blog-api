const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  author:{
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
    enum: ["draft", "published"],
    default: "draft",
  },
}, {timestamps: true});

const blog = mongoose.model("blog", blogSchema);

module.exports = blog;