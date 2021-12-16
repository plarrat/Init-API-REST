const mongoose = require("mongoose")
const category = require("./category")

const userSchema = mongoose.Schema({
  nom : String,
  prenom : String,
  age : Number,
  notes: Array,
  category:{type: mongoose.Schema.Types.ObjectId,ref:category}
})

module.exports = mongoose.model("user", userSchema)
