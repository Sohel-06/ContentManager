const mongoose = require("mongoose");
const validator = require("validator");
const contentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
  },
  description: {
    type: String,
    required: true,
    minlength: 5,
  },
  email: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email");
      }
    },
  },
  authorName: {
    type: String,
    required: true,
    minlength: 3,
  },
  file:String,
},{timestamps:true});

const Content=new mongoose.model('Content',contentSchema);
module.exports=Content;