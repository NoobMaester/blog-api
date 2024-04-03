const mongoose = require('mongoose');
require('dotenv').config();

const url = process.env.MONGOOSE_URL;

const connectToDb = () => {
    mongoose.connect(url)

    mongoose.connection.on('Connected', () => {
        console.log("connected to database")
    });

    mongoose.connection.on('error', (err) => {
        console.log(err)
    });
};

module.exports = connectToDb; 