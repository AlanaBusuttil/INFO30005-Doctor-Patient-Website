const express = require('express')
const appRouter = express.Router()
const appController = require('../controllers/appController')
const { authenticate } = require('../passport.js')


const passport = require('../passport.js')
appRouter.use(passport.authenticate('session'))

appRouter.get('/',appController.index)


appRouter.get('/logIn', appController.logIn)
/*appRouter.post('/logIn', 
passport.authenticate('local', { failureRedirect: '/login', successRedirect: "/Patient/Dashboard",failureFlash: true }),
appController.processLogin)*/

appRouter.post('/login',
    passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),
    (req, res) => { 
        console.log('user ' + req.user.username + ' logged in with role ' + req.user.role)
        res.redirect('/redi')
    }   
)
appRouter.get('/redi', (req, res) => {
    if (req.user.role === 'Patient') {
        res.redirect('/Patient/Dashboard')
    }
    else
        res.render('dashboard')
})

appRouter.get('/pa_SignUp', appController.pa_SignUp)
appRouter.get('/aboutUs', appController.aboutUs)
appRouter.get('/index_LoggedIn', appController.index_LoggedIn)
appRouter.get('/aboutUs_LoggedIn', appController.aboutUs_LoggedIn)

appRouter.get('/forgetPassword', appController.forgetPassword)
appRouter.get('/emailVerification', appController.emailVerification)
appRouter.get('/individualMessage', appController.individualMessage)
appRouter.get('/resetConfirmaton', appController.resetConfirmaton)

module.exports = appRouter