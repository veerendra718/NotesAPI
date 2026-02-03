const mongoose = require('mongoose');
const Note = require('../Models/NotesModel');
const asyncHandler = require('express-async-handler');

const getNotes = asyncHandler(async (req, res) => {
    const notes = await Note.find().sort({ updatedAt: -1 });
    res.status(200).json(notes);
})

const createNote = asyncHandler(async (req, res) => {
    const title = req.body.title?.trim();
    const content = req.body.content?.trim();
    if (!title || !content) {
        res.status(400);
        throw new Error('Please add a title and content');
    }
    const note = await Note.create({
        title,
        content
    })
    res.status(201).json({ message: 'Note created', note });
})

const updateNote = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400);
        throw new Error('Invalid note ID');
    }
    const title = req.body.title?.trim();
    const content = req.body.content?.trim();
    if (!title && !content) {
        res.status(400);
        throw new Error('Please add a title or content to update');
    }
    const note = await Note.findById(id);
    if (!note) {
        res.status(404);
        throw new Error('Note not found');
    }
    const hasChanges = (title && title !== note.title) || (content && content !== note.content);
    if (!hasChanges) {
        return res.status(200).json({ message: 'No changes detected' });
    }
    if (title) note.title = title;
    if (content) note.content = content;
    const updatedNote = await note.save();
    res.status(200).json({ message: 'Note updated', updatedNote });
})

const deleteNote = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400);
        throw new Error('Invalid note ID');
    }
    const note = await Note.findByIdAndDelete(id);
    if (!note) {
        res.status(404);
        throw new Error('Note not found');
    }
    res.status(200).json({ message: 'Note deleted', note });
})

const searchNotes = asyncHandler(async (req, res) => {
    const query = req.query.q?.trim();
    if (!query) {
        res.status(400);
        throw new Error('Please provide a search query');
    }
    const sanitizedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const notes = await Note.find({
        $or: [
            { title: { $regex: sanitizedQuery, $options: 'i' } },
            { content: { $regex: sanitizedQuery, $options: 'i' } }
        ]
    }).sort({ updatedAt: -1 });
    if (notes.length === 0) {
        return res.json({ message: 'No notes found', notes: [] });
    }
    res.status(200).json({ message: 'Notes found', notes });
})

module.exports = { getNotes, createNote, updateNote, deleteNote, searchNotes }