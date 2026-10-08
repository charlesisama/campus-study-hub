const User = require('../models/User');
const mongoose = require('mongoose');

// GET /users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving users', error: error.message });
    }
};

// GET /users/:id
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid user ID format' });
        }

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving user', error: error.message });
    }
};

// POST /users
const createUser = async (req, res) => {
    /* #swagger.parameters['body'] = {
          in: 'body',
          description: 'User registration details',
          required: true,
          schema: {
            firstName: 'Charles',
            lastName: 'Isama',
            email: 'charles@example.com',
            password: 'securepassword123',
            role: 'student',
            major: 'Software Engineering'
          }
    } */
    try {
        const { firstName, lastName, email, password, role, major } = req.body;

        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const newUser = new User({
            firstName,
            lastName,
            email,
            password,
            role: role || 'student',
            major: major || ''
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({ message: 'Failed to create user', error: error.message });
    }
};

// PUT /users/:id
const updateUser = async (req, res) => {

    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: 'Invalid user ID format'
            });
        }

        const {
            firstName,
            lastName,
            email,
            password,
            role,
            major
        } = req.body;

        if (!firstName || !lastName || !email || !password || !role || !major) {
            return res.status(400).json({
                message: 'All required fields must be provided'
            });
        }

        const updatedUser = await User.findByIdAndUpdate(
            id,
            {
                firstName,
                lastName,
                email,
                password,
                role,
                major
            },
            {
                new: true,
                runValidators: true
            }
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        res.status(200).json(updatedUser);

    } catch (error) {

        res.status(400).json({
            message: 'Failed to update user',
            error: error.message
        });

    }

};
// DELETE /users/:id
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid user ID format' });
        }

        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully', id });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};