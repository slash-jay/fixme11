const express = require("express");
const path = require("path");
const User = require("./config"); // Importing the User model
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

app.get("/job",(req,res)=>{
    res.render('job');
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

const port = 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});
