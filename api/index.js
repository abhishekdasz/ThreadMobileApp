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
            return res.status(400),json({message:"Email already registered"});
        }
        // create a new User 
        const newUser = new User({name, email, password});

        // generate and store the verification token
        newUser.verificationToken = crypto.randomBytes(20).toString('hex');

        // send the verification email to the user
        // sendVerificationEmail(newUser.email, newUser.verificationToken);
        
        // save the user to the database
        await newUser.save();
        res.status(200).json({message:"Registration successful, please check your email for verification"});
        
    } catch(error){
        console.log("error registering user", error);
        res.status(500).json({message: 'error registering user'});
    }
});
