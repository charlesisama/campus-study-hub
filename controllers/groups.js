const StudyGroup = require('../models/StudyGroup');
const mongoose = require('mongoose');

// GET /groups
const getAllGroups = async (req, res) => {
    try {
        const groups = await StudyGroup.find();
        res.status(200).json(groups);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving study groups', error: error.message });
    }
};

// GET /groups/:id
const getGroupById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid group ID format' });
        }

        const group = await StudyGroup.findById(id);
        if (!group) {
            return res.status(404).json({ message: 'Study group not found' });
        }
        res.status(200).json(group);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving study group', error: error.message });
    }
};

// POST /groups
const createGroup = async (req, res) => {
    /* #swagger.parameters['body'] = {
          in: 'body',
          description: 'New study group details',
          required: true,
          schema: {
            name: 'CSE 341 Web Services Study Group',
            course: 'CSE 341',
            description: 'Collaborative API development study team',
            ownerId: '650c1f1e2f3a4b5c6d7e8f01',
            members: []
          }
    } */
    try {
        const { name, course, description, ownerId, members } = req.body;

        if (!name || !course || !ownerId) {
            return res.status(400).json({ message: 'Missing required fields (name, course, ownerId)' });
        }

        const newGroup = new StudyGroup({
            name,
            course,
            description: description || '',
            ownerId,
            members: members || [ownerId]
        });

        const savedGroup = await newGroup.save();
        res.status(201).json(savedGroup);
    } catch (error) {
        res.status(400).json({ message: 'Failed to create study group', error: error.message });
    }
};

// PUT /groups/:id
const updateGroup = async (req, res) => {

    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: 'Invalid group ID format'
            });
        }

        const {
            name,
            course,
            description,
            ownerId,
            members
        } = req.body;

        if (!name || !course || !description || !ownerId) {
            return res.status(400).json({
                message: 'Name, course, description, and ownerId are required'
            });
        }

        if (members !== undefined && !Array.isArray(members)) {
            return res.status(400).json({
                message: 'Members must be an array'
            });
        }

        const updatedGroup = await StudyGroup.findByIdAndUpdate(
            id,
            {
                name,
                course,
                description,
                ownerId,
                members: members || []
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedGroup) {
            return res.status(404).json({
                message: 'Study group not found'
            });
        }

        res.status(200).json(updatedGroup);

    } catch (error) {

        res.status(400).json({
            message: 'Failed to update study group',
            error: error.message
        });

    }

};
// DELETE /groups/:id
const deleteGroup = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid group ID format' });
        }

        const deletedGroup = await StudyGroup.findByIdAndDelete(id);
        if (!deletedGroup) {
            return res.status(404).json({ message: 'Study group not found' });
        }

        res.status(200).json({ message: 'Study group deleted successfully', id });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting study group', error: error.message });
    }
};

module.exports = {
    getAllGroups,
    getGroupById,
    createGroup,
    updateGroup,
    deleteGroup
};