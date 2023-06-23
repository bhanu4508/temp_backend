const express = require('express');
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const noteController = require('../controllers/noteController');

// middle ware for authentication
router.use(authMiddleware);  
 
// GET /notes - Get all notes
router.get('/notes', noteController.getAllNotes);

// GET /notes/:id - Get a single note
router.get('/notes/:id', noteController.getNoteById);

// POST /notes - Create a new note
router.post('/notes', noteController.createNote);

// PUT /notes/:id - Update a note
router.put('/notes/:id', noteController.updateNote);

// DELETE /notes/:id - Delete a note
router.post('/notes/delete/', noteController.deleteNote);

module.exports = router;

