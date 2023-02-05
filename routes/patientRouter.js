const express = require('express') 
const patientRouter = express.Router() 
const patientController = require('../controllers/patientController') 

patientRouter.get('/', patientController.getAllPatientData) 
patientRouter.get('/Dashboard', patientController.getAllPatientData)
patientRouter.post('/Dashboard', patientController.pushData)

module.exports = patientRouter 