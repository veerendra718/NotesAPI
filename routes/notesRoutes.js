const express = require('express');
const router = express.Router();
const CreateNoteLimiter = require('../middleware/rateLimitMiddleware');
const { getNotes, createNote, updateNote, deleteNote, searchNotes } = require('../controllers/notesController');

router.route('/search').get(searchNotes);
router.route('/').get(getNotes).post(CreateNoteLimiter, createNote);
router.route('/:id').put(updateNote).delete(deleteNote);

module.exports = router;