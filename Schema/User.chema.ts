const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minLength: [3, " Name must be upto 3 characters "],
        maxLength: [12, " Name must be less than 12 characters "],
    },
    age: {
        type: Number,
        required: true,
        validate: {
            validator: (value) => {
                const isNumber = Number.isInteger(value);
                if (isNumber) return true
                else return false
            }
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minLength: [10, " Must provide a valid Mail address "],
        maxLength: [25, " Mail address cant be upto 30 characters "],
        unique: true
    },
    password: {
        type: String
    },
    number: {
        type: Number,
        required: true,
        trim: true,
        unique: true
    },
    address: {
        type: String,
        required: true,
        minLength: [6, " Provide a valid address"]
    }
}, {
    timestamps: true
})

module.exports = UserSchema;