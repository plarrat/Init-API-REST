const mongoose = require("mongoose")
const userSchema = mongoose.Schema({
  nom : String,
  prenom : String,
  age : Number,
  notes: Array
})

module.exports = mongoose.model("user", userSchema)