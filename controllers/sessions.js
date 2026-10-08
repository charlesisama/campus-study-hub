const Session = require('../models/Session');
const mongoose = require('mongoose');

// GET /sessions
const getAllSessions = async (req, res) => {

    try {

        const sessions = await Session.find();

        res.status(200).json(sessions);

    } catch (error) {

        res.status(500).json({
            message: 'Error retrieving study sessions',
            error: error.message
        });

    }

};

// GET /sessions/:id
const getSessionById = async (req, res) => {

    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {

            return res.status(400).json({
                message: 'Invalid session ID format'
            });

        }

        const session = await Session.findById(id);

        if (!session) {

            return res.status(404).json({
                message: 'Study session not found'
            });

        }

        res.status(200).json(session);

    } catch (error) {

        res.status(500).json({
            message: 'Error retrieving study session',
            error: error.message
        });

    }

};

// POST /sessions
const createSession = async (req, res) => {

    try {

        const {
            groupId,
            date,
            location,
            topic,
            description,
            attendees
        } = req.body;

        if (!groupId || !date || !location || !topic || !description) {

            return res.status(400).json({
                message: 'Missing required fields'
            });

        }

        const newSession = new Session({
            groupId,
            date,
            location,
            topic,
            description,
            attendees: attendees || []
        });

        const savedSession = await newSession.save();

        res.status(201).json(savedSession);

    } catch (error) {

        res.status(400).json({
            message: 'Failed to create study session',
            error: error.message
        });

    }

};

// PUT /sessions/:id
const updateSession = async (req, res) => {

    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: 'Invalid session ID format'
            });
        }

        const {
            groupId,
            date,
            location,
            topic,
            description,
            attendees
        } = req.body;

        if (!groupId || !date || !location || !topic || !description) {
            return res.status(400).json({
                message: 'Group ID, date, location, topic, and description are required'
            });
        }

        if (attendees !== undefined && !Array.isArray(attendees)) {
            return res.status(400).json({
                message: 'Attendees must be an array'
            });
        }

        const updatedSession = await Session.findByIdAndUpdate(
            id,
            {
                groupId,
                date,
                location,
                topic,
                description,
                attendees: attendees || []
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedSession) {
            return res.status(404).json({
                message: 'Study session not found'
            });
        }

        res.status(200).json(updatedSession);

    } catch (error) {

        res.status(400).json({
            message: 'Failed to update study session',
            error: error.message
        });

    }

};

// DELETE /sessions/:id
const deleteSession = async (req, res) => {

    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {

            return res.status(400).json({
                message: 'Invalid session ID format'
            });

        }

        const deletedSession = await Session.findByIdAndDelete(id);

        if (!deletedSession) {

            return res.status(404).json({
                message: 'Study session not found'
            });

        }

        res.status(200).json({
            message: 'Study session deleted successfully',
            id
        });

    } catch (error) {

        res.status(500).json({
            message: 'Error deleting study session',
            error: error.message
        });

    }

};

module.exports = {
    getAllSessions,
    getSessionById,
    createSession,
    updateSession,
    deleteSession
};