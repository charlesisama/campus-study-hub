const Resource = require('../models/Resource');
const mongoose = require('mongoose');

// GET /resources
const getAllResources = async (req, res) => {

    try {

        const resources = await Resource.find();

        res.status(200).json(resources);

    } catch (error) {

        res.status(500).json({
            message: 'Error retrieving resources',
            error: error.message
        });

    }

};

// GET /resources/:id
const getResourceById = async (req, res) => {

    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {

            return res.status(400).json({
                message: 'Invalid resource ID format'
            });

        }

        const resource = await Resource.findById(id);

        if (!resource) {

            return res.status(404).json({
                message: 'Resource not found'
            });

        }

        res.status(200).json(resource);

    } catch (error) {

        res.status(500).json({
            message: 'Error retrieving resource',
            error: error.message
        });

    }

};

// POST /resources
const createResource = async (req, res) => {

    try {

        const {
            title,
            url,
            type,
            description,
            groupId,
            uploadedBy
        } = req.body;

        if (!title || !url || !type || !description || !groupId || !uploadedBy) {

            return res.status(400).json({
                message: 'Missing required fields'
            });

        }

        const newResource = new Resource({
            title,
            url,
            type,
            description,
            groupId,
            uploadedBy
        });

        const savedResource = await newResource.save();

        res.status(201).json(savedResource);

    } catch (error) {

        res.status(400).json({
            message: 'Failed to create resource',
            error: error.message
        });

    }

};

// PUT /resources/:id
const updateResource = async (req, res) => {

    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: 'Invalid resource ID format'
            });
        }

        const {
            title,
            url,
            type,
            description,
            groupId,
            uploadedBy
        } = req.body;

        if (!title || !url || !type || !description || !groupId || !uploadedBy) {
            return res.status(400).json({
                message: 'Title, URL, type, description, groupId, and uploadedBy are required'
            });
        }

        const updatedResource = await Resource.findByIdAndUpdate(
            id,
            {
                title,
                url,
                type,
                description,
                groupId,
                uploadedBy
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedResource) {
            return res.status(404).json({
                message: 'Resource not found'
            });
        }

        res.status(200).json(updatedResource);

    } catch (error) {

        res.status(400).json({
            message: 'Failed to update resource',
            error: error.message
        });

    }

};

// DELETE /resources/:id
const deleteResource = async (req, res) => {

    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {

            return res.status(400).json({
                message: 'Invalid resource ID format'
            });

        }

        const deletedResource = await Resource.findByIdAndDelete(id);

        if (!deletedResource) {

            return res.status(404).json({
                message: 'Resource not found'
            });

        }

        res.status(200).json({
            message: 'Resource deleted successfully',
            id
        });

    } catch (error) {

        res.status(500).json({
            message: 'Error deleting resource',
            error: error.message
        });

    }

};

module.exports = {
    getAllResources,
    getResourceById,
    createResource,
    updateResource,
    deleteResource
};