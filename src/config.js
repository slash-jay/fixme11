const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/login-tut")
    .then(() => {
        console.log("Database Connected Successfully");
    })
    .catch(error => {
        console.error("Error connecting to database:", error);
    });

// Define the schema for user login
const LoginSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});
const JobApplicationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    place: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    jobDescription: {
        type: String,
        required: true
    },
    expectedSalary: {
        type: String,
        required: true
    },
    proofDescription: {
        type: String,
        required: true
    },
    submittedAt: {
        type: Date,
        default: Date.now
    }
});

// const userSchema = new mongoose.Schema         unique: true // Ensure uniquenes
module.exports = {
    User: mongoose.model("User", LoginSchema),
    JobApplication: mongoose.model("JobApplication", JobApplicationSchema)

    
};
