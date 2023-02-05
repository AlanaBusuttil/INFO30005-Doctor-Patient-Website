const Patient = require('../models/patient')
const patientRecords = require('../models/patientRecords') 
const latestRecords = require('../models/latestRecords') 
const user = require('../models/users')

function compare( a, b ) {
    if ( a.date < b.date ){
      return -1;
    }
    if ( a.date > b.date ){
      return 1;
    }
    return 0;
  }

//viewing all patients
const getAllPatientData = async (req, res, next) => {
    console.log("clinician routing getAllPatientData running")
    try {
        const patients = await Patient.find().lean()
        
        let i = 0;
        let id = 0;
        let arr = []
        let temp = [];
        let record = [];
        for(i = 0;i<patients.length;i++){
            id = patients[i]._id;
            temp = await patientRecords.find({patient_id: id}).lean()
            //console.log(temp)
            temp.sort(compare)

            record = await latestRecords.find({patient_id: id}).lean()
            if(record.length != 0){
                //console.log(record)
                latestRecords.updateOne({patient_id: id}, {blood_sugar: temp[0].blood_sugar, weight: temp[0].weight, insulin_does: temp[0].insulin_does, step_count: temp[0].step_count})
            }else{
                newEntry = new latestRecords({
                    patient_id: patients[i]._id,
                    firstName: patients[i].firstName,
                    lastName: patients[i].lastName,
                    blood_sugar:temp[0].blood_sugar,
                    weight: temp[0].weight,
                    insulin_does: temp[0].insulin_does,
                    step_count:temp[0].step_count,
                    blood_sugar_lower: patients[i].blood_sugar_lower,
                    blood_sugar_upper: patients[i].blood_sugar_upper,
                    note:patients[i].note,
                })
                await newEntry.save()
            }
        }

        const records = await latestRecords.find().lean()
        //console.log(records)
        return res.render('dashboard', {data:records})
    } catch (err) {
        return next(err)
    }
}
//used in viewing specific patients
const getPatientData = async(req,res, next) =>{
    console.log("clinician routing getPatientData running")
    console.log(parseInt(req.params._id))
    try {
        const patient = await Patient.find({_id: req.params._id}).lean()
        const records = await patientRecords.find({patient_id: req.params._id}).lean()

        records.sort(compare)
        
        return res.render('dashboard_ViewNote', { data: records, patient: patient[0] })
    } catch (err) {
        return next(err)
    }
}
//registering a new user
const registerPatient = async (req, res) =>{
    try{
        console.log(req.body)
        newPatient = new Patient({ 
            _id: Number,
            firstName: fname,
            lastName: lname,
            birthdate: bday,
            Adress: address1 + ", " + address2 + ", " + postcode + ", " + suburb,
            Meds: "none",
            blood_sugar_lower: 4,
            blood_sugar_upper: 6,
            note: "none",
            date_registered: Date
        })
        await newPatient.save()

        newUser = new user({ 
            username: email,
            password: password,
            role: "Patient",
            user_id: Number,
        })
        await newUser.save()

        return res.redirect('/emailVerification')
    } catch (err) {
        return next(err)
    }
}
 module.exports = {
    getAllPatientData,
    getPatientData,
    registerPatient,
}