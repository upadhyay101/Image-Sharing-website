const mongoose = require('mongoose');
const plm=require("passport-local-mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/pintproj");
// Define the schema for the User
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref:  'Post'
  }],
  dp: {
    type: String,
    default: '' // Default profile picture URL
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  fullname: {
    type: String,
    required: true,
    trim: true
  }
});


userSchema.plugin(plm);
// Create the User model
module.exports = mongoose.model('User', userSchema);


