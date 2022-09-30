const express = require("express");
const mongoose = require('mongoose');
const router = express.Router();
const UserSchema = require("../Schema/User.schema.js");
const User = new mongoose.model("User", UserSchema);


interface user {
    name: string;
    age: number;
    email: string;
    number: number;
    address: string;
}


router.post('/', async (req, res) => {

    try {
        const data = <user> req.body
        // let data: {
        //     name: string,
        //     age: number,
        //     email: string,
        //     number: number,
        //     address: string
        // } = req.body ;
        const userData = new User(data);
        console.log(userData);
        // const result: user = await userData.save();
        const result = await userData.save();
        console.log(result, "result");
        res.status(200).send({ status: true, message: "User save to db", data: result });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: " User Can't Update ",
            error: error.message
        })
    }

    // const userData: user = {
    //     name: "kayes",
    //     age: 22,
    //     email: 'kayes.ek8@gmail.com',
    //     number: 9227220,
    //     address: "Uttara, Dhaka"
    // }
})

module.exports = router;