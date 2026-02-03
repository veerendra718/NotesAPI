const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true,
        minlength: [3, 'Title must be at least 3 characters long']
    },
    content: {
        type: String,
        required: [true, 'Please add a content'],
        trim: true,
        minlength: [3, 'Content must be at least 3 characters long']
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Note', noteSchema);