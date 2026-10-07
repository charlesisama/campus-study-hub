const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    url: {
        type: String,
        required: true
    },

    type: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    groupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'StudyGroup',
        required: true
    },

    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('Resource', resourceSchema, 'resources');