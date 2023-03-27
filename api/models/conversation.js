const mongoose = require("mongoose");
const schema = mongoose.Schema;

const conversationSchema = new schema(
  {
    members:{
        type:Array 
    }
  },
  { timestamps: true }
);

const ConModel = mongoose.model("conversation", conversationSchema);

module.exports = { ConModel };
