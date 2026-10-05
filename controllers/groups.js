const mongoose = require('mongoose');
const StudyGroup = require('../models/StudyGroup');

// GET all study groups
exports.getAllGroups = async (req, res) => {
    try {
        const groups = await StudyGroup.find()
            .populate('ownerId', 'firstName lastName email')
            .populate('members', 'firstName lastName email');

        res.status(200).json(groups);
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving study groups',
            error: error.message
        });
    }
};

// GET single study group
exports.getGroupById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                message: 'Invalid study group ID'
            });
        }

        const group = await StudyGroup.findById(id)
            .populate('ownerId', 'firstName lastName email')
            .populate('members', 'firstName lastName email');

        if (!group) {
            return res.status(404).json({
                message: 'Study group not found'
            });
        }

        res.status(200).json(group);
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving study group',
            error: error.message
        });
    }
};

// POST create study group
exports.createGroup = async (req, res) => {
    try {
        const {
            name,
            course,
            description,
            ownerId,
            members
        } = req.body;

        if (!name || !course || !description || !ownerId) {
            return res.status(400).json({
                message:
                    'Please provide name, course, description, and ownerId'
            });
        }

        if (!mongoose.isValidObjectId(ownerId)) {
            return res.status(400).json({
                message: 'Invalid ownerId'
            });
        }

        if (members && !Array.isArray(members)) {
            return res.status(400).json({
                message: 'members must be an array'
            });
        }

        const newGroup = new StudyGroup({
            name,
            course,
            description,
            ownerId,
            members: members || []
        });

        const savedGroup = await newGroup.save();

        res.status(201).json(savedGroup);
    } catch (error) {
        res.status(400).json({
            message: 'Error creating study group',
            error: error.message
        });
    }
};

// PUT update study group
exports.updateGroup = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                message: 'Invalid study group ID'
            });
        }

        const updatedGroup = await StudyGroup.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        )
            .populate('ownerId', 'firstName lastName email')
            .populate('members', 'firstName lastName email');

        if (!updatedGroup) {
            return res.status(404).json({
                message: 'Study group not found'
            });
        }

        res.status(200).json({
            message: 'Study group updated successfully',
            group: updatedGroup
        });
    } catch (error) {
        res.status(400).json({
            message: 'Error updating study group',
            error: error.message
        });
    }
};

// DELETE study group
exports.deleteGroup = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                message: 'Invalid study group ID'
            });
        }

        const deletedGroup = await StudyGroup.findByIdAndDelete(id);

        if (!deletedGroup) {
            return res.status(404).json({
                message: 'Study group not found'
            });
        }

        res.status(200).json({
            message: 'Study group deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting study group',
            error: error.message
        });
    }
};