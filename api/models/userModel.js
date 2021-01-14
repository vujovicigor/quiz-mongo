const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
let salt = bcrypt.genSaltSync(10);

let userSchema = new mongoose.Schema({
    email: {
      type: String,
      required:true,
      index: true,
      unique: true 
    },
    password: {
      type: String,
      required:true,
      select: false,
      set: v => bcrypt.hashSync(v, salt)
    },
    role: {
      type: String,
      required:true,
      enum : ['user','admin'],
      default: 'user'
    },
    name_first:{
      type: String,
      required:true
    },
    name_last:String,
})

userSchema.methods.comparePassword = function(pass) {
  return bcrypt.compareSync(pass, this.password);
}

module.exports = mongoose.model('User', userSchema)