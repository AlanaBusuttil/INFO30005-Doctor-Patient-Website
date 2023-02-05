const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    blood_sugar:Number,
    weight: Number,
    insulin_does: Number,
    step_count:Number,
    patient_id: Number,
    comment: String,
    date: Date

})
const patientRecords = mongoose.model('patientRecords', schema)
console.log("connected with patientRecord collection")
module.exports = patientRecords