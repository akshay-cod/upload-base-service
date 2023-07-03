// External Dependancies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  first_name: { type: String },
  last_name: { type: String },
  user_name:{ type:String },
  email: { type: String, unique:false},
  phone_number: { type: String, required:true, unique:true},
  profile_picture: { type: String },
  account_type:{type:String},
  wallet:{type:Schema.Types.ObjectId ,ref:"wallet"},
  commission:{type:Schema.Types.ObjectId ,ref:"commission"}
},{timestamps:true});

//userSchema.index({email:1})
userSchema.index({phone_number:1})
//userSchema.index({email:1,phone_number:1},{background:true, unique:true});

module.exports = mongoose.model("users", userSchema);