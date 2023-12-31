const mongoose = require("mongoose");

// mongoose.plugin(slug);
const { Schema } = mongoose;

const UserSchema = new Schema({
  email: {
    type: String,
    require: true,
    index: true,
    unique: true,
    sparse: true,
  },

  password: String,
  date: { type: Date, default: Date.now },
  age: { type: Number, min: 0, max: 120 },

  avatar: String,
  fullName: String,
  role: String,
  phoneNumber: { type: String },

}, { timestamps: { createdAt: 'created_at' } });
const User = mongoose.model("Users", UserSchema);
module.exports = User;
