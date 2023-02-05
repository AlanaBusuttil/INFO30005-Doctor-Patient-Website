const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    _id:Number,
    first_name: String,
    last_name: String
})
const Clinician = mongoose.model('clinicians', schema)
console.log("connected with Clinician collection")
module.exports = Clinician