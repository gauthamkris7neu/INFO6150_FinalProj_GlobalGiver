const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const JWT_SECRET = 'yourSecretKey';



const userLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        if(user.isVerified === false){
            return res.status(401).json({ message: 'User not verified , if your an organization please wait untill the admin approves your request' });
        }
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            JWT_SECRET,
            { expiresIn: '1h' }
        );
        res.status(200).json({ message: 'Login successful', token: token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};

module.exports = {
    userLogin
};