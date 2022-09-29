const mongoose = require('mongoose');
const colors = require("colors");

const dbConnection = () => {
    mongoose.connect(`${process.env.DATABASE_LOCAL}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => console.log(`Database connection successful, URI ${process.env.DATABASE_LOCAL}`.blue.bold));
}

module.exports = dbConnection;
