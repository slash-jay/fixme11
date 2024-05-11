const mongoose = require('mongoose');

// Replace <password> with your actual password
const clusterUrl = 'mongodb+srv://konajayashankar:RJcbDdeiXx3UvTZk@cluster0.jtwac24.mongodb.net/login-tut';

mongoose.connect(clusterUrl, { useNewUrlParser: true, useUnifiedTopology: true })
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
const InnovationProposalSchema = new mongoose.Schema({
    idea_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    problem_statement: {
        type: String,
        required: true
    },
    solution_description: {
        type: String,
        required: true
    },
    target_market: {
        type: String,
        required: true
    },
    competitive_analysis: {
        type: String,
        required: true
    },
    revenue_model: {
        type: String,
        required: true
    },
    execution_plan: {
        type: String,
        required: true
    },
    team: {
        type: String,
        required: true
    },
    financial_projections: {
        type: String,
        required: true
    },
    risks_and_mitigations: {
        type: String,
        required: true
    },
    exit_strategy: {
        type: String,
        required: true
    },
    additional_materials: {
        type: String
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
    Idea: mongoose.model("Idea", IdeaSchema),
    InnovationProposal: mongoose.model("InnovationProposal", InnovationProposalSchema)
    
};
