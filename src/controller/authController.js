const users = require('../model/userModel');
const bycript = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

//CREATE A TOKEN
const signToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: 3600 // expires in 1 hour
    });
}

// SIGN UP A USER
const signup = async (req, res) => {
    try{
        const {email, firstName, lastName, password} = req.body;
        if(!(email && firstName && lastName)){
            return res.status(400).send('All required fields')
        }
        const oldUser = await users.findOne({ email});
        if(oldUser){
            return res.status(409).send('User already exists');
        }
        const hashPassword = await bycript.hash(password, 12);
        const newUser = new users({
            email: email.toLowerCase(),
            firstName,
            lastName,
            password: hashPassword
        });

        const token = signToken(newUser._id);
        const user = await newUser.save();

        res.status(200).json({status: 'success', token, user});
    } catch (err) {
        res.status(500).json(err.message);
    }
}

//LOGIN A USER
const login = async (req, res) => {
    try{
        const {email, password} = req.body;
        if(!(email && password)){
            return res.status(400).json('All required fields')
        }

        const user = await users.findOne({email: req.body.email});
        
        if(!user){
            return res.status(400).send('User not found');
        }

        const isMatch = await bycript.compare(req.body.password, user.password);
        if(!isMatch){
            return res.status(400).json('Invalid password');
        }
        const token = signToken(user._id);
        res.status(200).json({status: 'success', token, user});
    } catch (err) {
        res.status(500).json(err.message);
    }
}

module.exports = {
    signup,
    login
}