const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    _id: Number,
    firstName: String,
    lastName: String,
    birthdate: Date,
    Adress: String,
    Meds: String,
    blood_sugar_lower: Number,
    blood_sugar_upper: Number,
    note:String,
    date_registered: Date

})
const Patient = mongoose.model('patients', schema)
console.log("connected with Patient collection")
module.exports = Patient