const mongoose = require("mongoose");
const schema = mongoose.Schema;

const messageSchema = new schema(
  {
    conId : {
        type:String
    },
    sender:{
        type:String
    },
    text:{
        type:String
    }
  },
  { timestamps: true }
);

const MessageModel = mongoose.model("message", messageSchema);

module.exports = { MessageModel };
