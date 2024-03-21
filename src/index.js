const express = require("express");
const path = require("path");
const collection = require("./config");
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("login");
});

app.get("/home", (req, res) => {
    res.render("home");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

app.get("/about", (req, res) => {
    res.render('about'); 
});

app.get("/services", (req, res) => {
    res.render('services'); 
});

app.get("/contact", (req, res) => {
    res.render('contact'); 
});
app.post("/submit-proposal", async (req, res) => {
    const data = {
        name: req.body.name,
        place: req.body.place,
        description: req.body.description
        // Add other form fields here if needed
    };

    // Redirect to the investor page with query parameters containing the proposal details
    res.redirect(`/views/investor?name=${encodeURIComponent(data.name)}&place=${encodeURIComponent(data.place)}&description=${encodeURIComponent(data.description)}`);
});
app.get("/views/job.ejs", (req, res) => {
    res.render("job");
});
app.get("/views/investor.ejs", (req, res) => {

    // Retrieve proposal details from query parameters
    const proposal = {
        name: req.query.name,
        place: req.query.place,
        description: req.query.description
    };

    // Render the investor page with the proposal details
    res.render("investor", { proposal });
});

app.post("/signup", async (req, res) => {
    const data = {
        name: req.body.username,
        password: req.body.password
    }

    // Check if the username already exists in the database
    const existingUser = await collection.findOne({ name: data.name });

    if (existingUser) {
        res.send('User already exists. Please choose a different username.');
    } else {
        // Hash the password using bcrypt
        const saltRounds = 10; // Number of salt rounds for bcrypt
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);

        data.password = hashedPassword; // Replace the original password with the hashed one

        const userdata = await collection.insertMany(data);
        console.log(userdata);
        res.render("login"); // Redirect to login page after successful signup
    }
});

app.post("/login", async (req, res) => {
    try {
        const check = await collection.findOne({ name: req.body.username });
        if (!check) {
            res.send("User name cannot be found");
            return 
        }
        
        // Compare the hashed password from the database with the plaintext password
        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
        if (!isPasswordMatch) {
            res.send("Wrong password");
        } else {
            res.render("home");
        }
    } catch (error) {
        console.error(error);
        res.send("Error occurred while processing login");
    }
});
app.post("/submit-proposal", async (req, res) => {
    const data = {
        name: req.body.name,
        place: req.body.place,
        description: req.body.description
        // Add other form fields here if needed
    };

    // Here you can process the data, store it in the database, or handle it as needed
    // For example:
    // const savedData = await collection.insertOne(data);
    // console.log(savedData);

    // For simplicity, I'm just sending a success message back to the client
    res.send('Proposal submitted successfully');
});
const port = 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});
