const express = require("express");
const path = require("path");
const nodemailer = require('nodemailer');
//const User = require("./config"); // Importing the User model
const bcrypt = require('bcrypt');
//const FormEntry = require('./formEntry');
const { User,JobApplication,Idea,InnovationProposal} = require('./config');

//     console.error('Error creating job application:', error);
// });
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(express.static("public"));
const transporter = nodemailer.createTransport({
    // Configuration for your email service provider (e.g., Gmail)
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com',
        pass: 'your-password'
    }
});
app.get("/", (req, res) => {
    res.render("login");
});
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

app.post('/send-email', async (req, res) => {
    try {
        const { to, from } = req.body;

        // Send email
        await transporter.sendMail({
            from: from, // Sender's email fetched from the popup prompt
            to: to, // Recipient's email fetched from the proposal
            subject: 'Proposal Accepted',
            text: 'Your proposal has been accepted! Congratulations!'
        });

        res.sendStatus(200);
    } catch (error) {
        console.error('Error sending email:', error);
        res.sendStatus(500);
    }
});

app.get("/home", (req, res) => {
    res.render("home");
});
app.get("/inter", (req, res) => {
    res.render("inter");
});
app.get("/jp", (req, res) => {
    res.render("jp");
});
app.get("/innovation", (req, res) => {
    res.render("innovation");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

app.get("/about", (req, res) => {
    res.render('about'); 
});
app.get("/jobpartners", (req, res) => {
    res.render('jobpartners'); 
}
);

app.get("/services", (req, res) => {
    res.render('services'); 
});

app.get("/contact", (req, res) => {
    res.render('contact'); 
});

// app.get("/job",(req,res)=>{
//     res.render('job');
// });

app.get("/proposals",(req,res)=>{
    res.render('proposals');
});
app.get('/job', async (req, res) => {
    try {
        // Fetch all job applications from the database
        const jobApplications = await JobApplication.find({});
        
        // Render the job.ejs template with job applications data
        res.render('job', { jobApplications: jobApplications });
    } catch (error) {
        console.error('Error fetching job applications:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.get("/viewproposals", async (req, res) => {
    try {
        // Fetch all proposals from the Idea collection
        const proposals = await Idea.find({});

        // Render the viewproposals.ejs template with the proposals data
        res.render("viewproposals", { proposals: proposals });
    } catch (error) {
        console.error('Error fetching proposals:', error);
        res.status(500).send('Internal Server Error');
    }
});
app.post('/submit-1', async (req, res) => {
    try {
        // Extract data from the request body
        const { name, email, phone, idea, profit, investment, 'my-investment': myInvestment, proof } = req.body;

        // Create a new Idea document
        const newIdea = new Idea({
            name,
            email,
            phoneNo: phone,
            ideaDescription: idea,
            marginalProfit: profit,
            totalInvestment: investment,
            myInvestment,
            proof,
            submittedAt: new Date()
        });

        // Save the new Idea document to the database
        await newIdea.save();

        res.status(200).json({ message: 'Idea submitted successfully' });
    } catch (error) {
        console.error('Error submitting idea:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Endpoint to fetch user data
app.get('/users', async (req, res) => {
    try {
        // Fetch all users from the database
        const users = await User.find({}, { name: 1, password: 1 }); // Only fetch name and password fields
        console.log('Users:', users); // Log the users data
        res.json(users);
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.get("/user/:userId/proposals", async (req, res) => {
    try {
        const userId = req.params.userId;

        // Count the number of proposals made by the user
        const proposalCount = await JobApplication.countDocuments({ userId });

        res.json(proposalCount);
    } catch (error) {
        console.error('Error fetching proposal count:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.post("/signup", async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the username already exists in the database
        const existingUser = await User.findOne({ name: username });

        if (existingUser) {
            return res.send('User already exists. Please choose a different username.');
        }

        // Hash the password using bcrypt
        const saltRounds = 10; // Number of salt rounds for bcrypt
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create a new user document
        await User.create({ name: username, password: hashedPassword });
        console.log('User created successfully:', { name: username }); // Log the new user's name
        res.render("login"); // Redirect to login page after successful signup
    } catch (error) {
        console.error('Error signing up user:', error);
        res.status(500).send("Error occurred while processing signup");
    }
});
// Route to render the user's dashboard
// Endpoint to fetch job applications for a specific user
app.get("/user/:name/proposals", async (req, res) => {
    try {
        const username = req.params.name;

        // Fetch the job applications for the provided name
        const userJobApplications = await JobApplication.find({ name: username });

        res.json(userJobApplications);
    } catch (error) {
        console.error('Error fetching job applications:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



// Route to render the user's dashboard
// Render the form to input username when accessing the dashboard
app.get('/dashboard', (req, res) => {
    res.render('dashboard_username_form');
});
app.get('/viewproposals', async (req, res) => {
    try {
        const proposals = await InnovationProposal.find();
        res.json(proposals);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.post('/submit_proposal', async (req, res) => {
    try {
        const {
            idea_name,
            email,
            problem_statement,
            solution_description,
            target_market,
            competitive_analysis,
            revenue_model,
            execution_plan,
            team,
            financial_projections,
            risks_and_mitigations,
            exit_strategy,
            additional_materials,
        } = req.body;

        // Create new InnovationProposal document
        const proposal = new InnovationProposal({
            idea_name,
            email,
            problem_statement,
            solution_description,
            target_market,
            competitive_analysis,
            revenue_model,
            execution_plan,
            team,
            financial_projections,
            risks_and_mitigations,
            exit_strategy,
            additional_materials,
        });
// console.log(proposal);
        // Save the proposal to MongoDB
        await proposal.save();

        res.status(201).json({ message: 'Proposal submitted successfully' });
    } catch (error) {
        console.error('Error submitting proposal:', error);
        res.status(500).json({ message: 'Error submitting proposal' });
    }
});

// Handle form submission to fetch job applications based on the provided username
app.post('/dashboard', async (req, res) => {
    try {
        const username = req.body.username;

        // Fetch job applications for the provided username
        const userJobApplications = await JobApplication.find({ name: username });

        // Fetch investor proposals for the provided username
        const userInvestorProposals = await Idea.find({ name: username });

        // Render the dashboard template with job applications and investor proposals data
        res.render('dashboard', {
            jobApplications: userJobApplications,
            proposals: userInvestorProposals
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
});



app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ name: username });

        if (!user) {
            return res.send("User name cannot be found");
        }

        // Compare the hashed password from the database with the plaintext password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.send("Wrong password");
        }

        // Check if the user is an admin
        if (username === 'jai' && password === 'jai') {
            res.render("admin"); // Redirect to admin page
        } else {
            res.render("home");
        }
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).send("Error occurred while processing login");
    }
});
// Function to generate a random color
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Route to render the viewinnovation page with innovation proposals
app.get('/viewinnovation', async (req, res) => {
    try {
        // Fetch all proposals from the database
        const proposals = await InnovationProposal.find({});
        
        // Generate a random color for each proposal
        proposals.forEach(proposal => {
            proposal.randomColor = getRandomColor();
        });

        // Render the viewinnovation.ejs template with the proposals data
        res.render("viewinnovation", { proposals: proposals });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


app.post("/submit-form", async (req, res) => {
    try {
        // Parse form data from the request body
        const { name, place, mobile, jobDescription, expectedSalary, proofDescription } = req.body;


        // Create a new instance of the FormEntry model with the parsed form data
        const newJobApplication = new JobApplication({
            name,
            place,
            mobile,
            jobDescription,
            expectedSalary,
            proofDescription
        });

        // Save the new form entry to the database
        await newJobApplication.save();

        // Respond with a success message
        res.status(201).send('Form data saved successfully!');
    } catch (error) {
        console.error('Error saving form data:', error);
        res.status(500).send("An error occurred while saving form data. Please try again later.");
    }
});


const port = 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});
