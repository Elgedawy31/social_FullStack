const mongoose = require("mongoose");
const schema = mongoose.Schema;

const PostSchema = new schema(
  {
    userId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
    },
    image: {
      type: String,
    },
    likes: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const PostModel = mongoose.model("post", PostSchema);

module.exports = { PostModel };
