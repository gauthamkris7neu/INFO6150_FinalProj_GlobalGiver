const Users = require('../models/users');
const userService = require('../services/userService');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const JWT_SECRET = 'yourSecretKey';

const create = async (req, res) => {
    console.log(req.body);
    const { fullName, email, password, userType } = req.body;
    const validationErrors = userService.validateInput(email, fullName, password);
    if (Object.keys(validationErrors).length) {
        return res.status(400).json({ errors: validationErrors });
    }
    try {
        const existingUser = await Users.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const newUserDetails = { fullName, email, password, userType };
        if(userType === 'organization' && req.file){
            newUserDetails.isVerified = false;
            newUserDetails.fileInfo = req.file.path;
        }
        const newUser = new Users(newUserDetails);
        await newUser.save(); 
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
}

const userLogin = async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;
    try {
        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        if(user.isVerified === false && user.userType === 'organization'){
            return res.status(401).json({ message: 'User not verified , if your an organization please wait untill the admin approves your request' });
        }
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            JWT_SECRET,
            { expiresIn: '1h' }
        );
        res.status(200).json({ message: 'Login successful', token: token, userType: user.userType});
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};


module.exports = {
    create,
    userLogin
};