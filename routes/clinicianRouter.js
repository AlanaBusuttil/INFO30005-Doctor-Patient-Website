const express = require('express') 
const clinicianRouter = express.Router() 
const clinicianController = require('../controllers/clinicianController') 

clinicianRouter.get('/Dashboard', clinicianController.getAllPatientData) 
clinicianRouter.get('/Dashboard/:_id',clinicianController.getPatientData)
clinicianRouter.post('/pa_SignUp', clinicianController.registerPatient)

module.exports = clinicianRouter 