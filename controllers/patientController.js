const Patient = require('../models/patient')
const patientRecords = require('../models/patientRecords')

//finding data with the data of the patient that logged in. Right now it is hard coded to 2131, which is Pat's pateint ID
const getAllPatientData = async (req, res, next) => {
    try {
        //this is Pat's patient ID. this would change based off different IDs in future updates
        const records = await patientRecords.find({patient_id: 1234}).lean()
        const patient = await Patient.find({_id:1234}).lean()

        return res.render('pa_MedicalInfo', { data: records, patientData: patient })
    } catch (err) {
        return next(err)
    }
}
const pushData = async (req, res) =>{

	console.log(req.body)
    const {bsugar, insulin, weight, steps, comment, Date} = req.body
	const first_name = "Pat"
	const last_name = "Postman"
	const Patient_ID = 1234

    newEntry = new patientRecords({ blood_sugar: bsugar, weight,insulin_does: insulin,step_count: steps, patient_id: 1234,comment: comment, date:Date })
	await newEntry.save()
    return res.redirect("/Patient/Dashboard")
}
module.exports = {
    getAllPatientData,
    pushData
}