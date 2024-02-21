const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/login-tut")
    .then(() => {
        console.log("Database Connected Successfully");
    })
    .catch(error => {
        console.error("Error connecting to database:", error);
    });



// Create Schema
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

// collection part
const collection = new mongoose.model("users", Loginschema);

module.exports = collection;