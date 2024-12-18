const express = require('express');
const { addNote, getNotes, updateNote, deleteNote } = require('../controllers/noteController');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, addNote);
router.get('/', authMiddleware, getNotes);
router.put('/:id', authMiddleware, updateNote);
router.delete('/:id', authMiddleware, deleteNote);

module.exports = router;
