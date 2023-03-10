const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
    _id:Number,
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String},
    //this will be the clinician id or patient id depending on role
    user_id: {type:Number}

})

// password comparison function
userSchema.methods.verifyPassword = function (password, callback) {
    compare(password, this.password, (err, valid) => {
        callback(err, valid)
    })
}

const SALT_FACTOR = 10

// hash password before saving
userSchema.pre('save', function save(next) {
    const user = this// go to next if password field has not been modified
    if (!user.isModified('password')) {
        return next()
    }

    // auto-generate salt/hash
    bcrypt.hash(user.password, SALT_FACTOR, (err, hash) => {
        if (err) {
            return next(err)
        }
        //replace password with hash
        user.password = hash
        next()
    })
})

const User = mongoose.model('users', userSchema)


console.log("connected with users collection")
module.exports = User