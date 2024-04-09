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
const IdeaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNo: {
        type: String,
        required: true
    },
    ideaDescription: {
        type: String,
        required: true
    },
    marginalProfit: {
        type: Number,
        required: true
    },
    totalInvestment: {
        type: Number,
        required: true
    },
    myInvestment: {
        type: Number,
        required: true
    },
    proof: {
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
    JobApplication: mongoose.model("JobApplication", JobApplicationSchema),
    Idea: mongoose.model("Idea", IdeaSchema)
    
};
