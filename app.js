const exphbs = require('express-handlebars')
//created a handlebar helper function that sees if a num is in a range. This will be used to asssess if blood sugar levels of patients are safe
var hbs = exphbs.create({})
hbs.handlebars.registerHelper("danger", function(num1, lower, upper, options){
    if (num1<lower || num1>upper){
        return options.fn(this); 
    }
    return options.inverse(this); 
})
const express = require('express') 
const app = express() 
require('./models/index.js')


// set up Handlebars----------------------

app.use(express.static('public'))
app.use(express.static('assets'))
app.use(express.urlencoded({extended:true}))

app.engine('hbs', exphbs.engine({
    defaultLayout: 'main',
    extname: 'hbs'
}))

app.set('view engine', 'hbs')




// set up login sessions - code is explained in tutorial
const flash = require('express-flash')
app.use(flash())
const session = require('express-session') 
app.use(
    session({
        // The secret used to sign session cookies (ADD ENV VAR)
        secret: process.env.SESSION_SECRET || 'keyboard cat',
        name: 'demo', // The cookie name (CHANGE THIS)
        saveUninitialized: false,
        resave: false,
        proxy: process.env.NODE_ENV === 'production', //  to work on Heroku
        cookie: {
            sameSite: 'strict',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 300000 // sessions expire after 5 minutes
        },
    })
)

const appRouter = require('./routes/appRouter')
app.use('/', appRouter);
// render our web page
app.get('/', (req, res) => { 
    res.render('index.hbs') 
});
//----------------------------------------------

// use PASSPORT
const passport = require('./passport.js')
app.use(passport.authenticate('session'))

// Passport Authentication middleware
const isAuthenticated = (req, res, next) => {
    // If user is not authenticated via Passport, redirect to login page
    if (!req.isAuthenticated()) {
        return res.redirect('/login')
    }
    // Otherwise, proceed to next middleware function
    return next()
}

// set up role-based authentication
const hasRole = (thisRole) => {
    return (req, res, next) => {
        if (req.user.role == thisRole) 
            return next()
        else {
            res.redirect('/')
        }
    }    
}

//Routing patient 
const patientRouter = require('./routes/patientRouter') 
app.use('/Patient', patientRouter)

//Routing clinician
const clinicianRouter = require('./routes/clinicianRouter') 
app.use('/clinician', clinicianRouter) 

app.listen(process.env.PORT || 3000, () => {
    console.log('The diabetes app is running!')
})