const index = async (req, res) => {console.log("will this index function work")
 res.render('index'); }


const logIn = async (req, res) => { 
    console.log("log in get runs")
    res.render('login', {flash: req.flash('error'), title: 'Login'})
}

const Users = require('../models/users')
const processLogin = async (req, res) => {
    console.log(req.body)
}


const pa_SignUp = async (req, res) => { res.render('pa_SignUp'); }
const aboutUs = async (req, res) => { res.render('aboutUs'); }
const index_LoggedIn = async (req, res) => { res.render('index_LoggedIn'); }
const aboutUs_LoggedIn = async (req, res) => { res.render('aboutUs_LoggedIn'); }
const forgetPassword = async (req, res) => { res.render('forgetPassword'); }
const dashboard_AddNote = async (req, res) => { res.render('dashboard_AddNote'); }


const emailVerification = async (req, res) => { res.render('emailVerification'); }
const individualMessage = async (req, res) => { res.render('individualMessage'); }
const resetConfirmaton = async (req, res) => { res.render('resetConfirmaton'); }
//const pa_Messages = async (req, res) => { res.render('pa_Messages'); }
//const pa_Profile = async (req, res) => { res.render('pa_Profile'); }

module.exports = {
    index,
    logIn,
    aboutUs,
    pa_SignUp,
    forgetPassword,
    index_LoggedIn,
    aboutUs_LoggedIn,
    emailVerification,
    resetConfirmaton,
    dashboard_AddNote,
    individualMessage,
    processLogin
}