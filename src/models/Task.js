const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    description: String,

    priority: {
        type: String, enum: ['low', 'medium', 'high'], default: 'low'
    },

    status: {
        type: String, enum: ['pending', 'in progress', 'completed'], default: 'pending'
    },

    assignedTo: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
