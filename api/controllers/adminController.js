const Users = require('../models/users');
// const userService = require('../services/userService');

const deleteOrg = async(req, res) => {
    const {adminEmail, orgEmail} = req.body;
    try{
        const user = await Users.findOne({ email: adminEmail });
        if(!user) {
            res.status(404).json({ message: "A user with email " + adminEmail + " cannot be found." });
        }
        if (user.userType === 'admin') {
            await Users.findOneAndDelete({email : orgEmail});
            res.status(200).json({message: 'User deleted successfully'});
        } else {
                res.status(404).json({ message: 'You are not an admin'});
        }
    }
    catch(error){
        res.status(500).json({message: 'Error Deleting user', error: error.message});
    }
};

const getAllOrgUsers = async(req, res) =>{
    const {email} = req.body;
    try{
        const user = await Users.findOne({email});
        if(!user) {
            res.status(404).json({ message: "A user with email " + email + " cannot be found." });
        }
        if(user.userType === 'admin'){
            const allUsers = await Users.find({userType: 'organization', isVerified: false})
                .select('fullName email fileInfo isVerified');
            res.status(200).json(allUsers);
        } else {
                res.status(404).json({ message: 'You are not an admin'});
        }
    } catch(error){
        res.status(500).json({message: 'Error Retreiving users', error: error.message});
    }
};

const verfication = async (req, res) => {
    const {adminEmail, orgEmail, status} = req.body;
    console.log(req.body);
    try {
        const adminUser = await Users.findOne({email: adminEmail});
        if(!adminUser) {
            res.status(404).json({ message: "A user with email " + adminEmail + " cannot be found." });
        }
        if(adminUser.userType === 'admin') {
            const orgUser = await Users.findOne({email: orgEmail});
            if(status === 'approved') {
                orgUser.isVerified = true;
                await orgUser.save();
                res.status(200).json({message: 'Verification Successful'});
            } else {
                await deleteOrg(req, res);
            }
        } else {
            res.status(404).json({ message: 'You are not an admin'});
        }
    } catch (error) {
        res.status(500).json({message: 'Error Verifying users', error: error.message});
    }
}

module.exports = {
    getAllOrgUsers,
    deleteOrg,
    verfication
};
