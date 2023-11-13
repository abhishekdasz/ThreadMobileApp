const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;
const cors = require('cors');
app.use(cors());

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
const jwt = require('jsonwebtoken');

mongoose.connect('mongodb+srv://abhishekdaszy:9437barun@threadapp.suzuzg7.mongodb.net/',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log('Connected to MongoDB');
}).catch((err)=>{
    console.log("Error connecting MongoDB");
})

app.listen(port, () => {
    console.log("Server is running on port 3000");
});

const User = require('./models/user');
// const Post = require('./models/post');

// endpoint to register a user in the backend
app.post("/register", async(req, res) => {
    try{
        console.log("Received registration request:", req.body);

        const {name, email, password} = req.body;

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"Email already registered"});
        }
        // create a new User 
        const newUser = new User({name, email, password});

        // generate and store the verification token
        newUser.verificationToken = crypto.randomBytes(20).toString('hex');
        
        // save the user to the database
        await newUser.save();
        res.status(200).json({message:"Registration successful, please check your email for verification"});

    } catch(error){
        console.log("error registering user", error);
        res.status(500).json({message: 'error registering user'});
    }
});


// generation of secret key(Login)
const generateSecretKey = () => {
    const secretKey = crypto.randomBytes(32).toString("hex");
    return secretKey;
};

const secretKey = generateSecretKey();

app.post("/login", async (req, res) => {
    try{
        const {email, password} = req.body;
        console.log("Login request received for email:", email);
        
        const user = await User.findOne( {email} );
        if(!user)
        {
            return res.status(404).json({ message: "Invalid email" });
        }

        if(user.password != password)
        {
            return res.status(404).json({ message: "Invalid Password" });
        }
        const token = jwt.sign({ userId: user._id }, secretKey);
        console.log('Token:', token);

        res.status(200).json({ token });
    } catch(error){
        res.status(500).json({ message: "Login failed" });
    }
});


// endpoint to access all the users except the logged in the user
app.get("/user/:userId", (req, res) => {
    try {
      const loggedInUserId = req.params.userId;
  
      User.find({ _id: { $ne: loggedInUserId } })
        .then((users) => {
          res.status(200).json(users);
        })
        .catch((error) => {
          console.log("Error: ", error);
          res.status(500).json("errror");
        });
    } catch (error) {
      res.status(500).json({ message: "error getting the users" });
    }
});

app.get("/profile/:userId", async (req, res) => {
    try {
      const userId = req.params.userId;
  
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      return res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ message: "Error while getting the profile" });
    }
});