const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({

    groupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'StudyGroup',
        required: true
    },

    date: {
        type: Date,
        required: true
    },

    location: {
        type: String,
        required: true
    },

    topic: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    attendees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]

});

module.exports = mongoose.model('Session', sessionSchema, 'sessions');