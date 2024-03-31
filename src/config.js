const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/login-tut")
    .then(() => {
        console.log("Database Connected Successfully");
    })
    .catch(error => {
        console.error("Error connecting to database:", error);
    });

// Define the schema
const Loginschema = new mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// Define and export the mongoose model
module.exports = mongoose.model("User", Loginschema);
