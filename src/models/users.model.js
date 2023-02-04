const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true // `email` must be unique
  },
  password:{
    type:String,
    require:true
  }
});
const User = mongoose.model('User', userSchema);
module.exports=User;