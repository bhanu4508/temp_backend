const { json } = require('express');
const Note = require('../models/noteModel');

// Get all notes
async function getAllNotes(req, res) {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}

// Get a single note by ID
async function getNoteById(req, res) {
  const { id } = req.params;

  try {
    const note = await Note.findById(id);
    
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    
    // Check if the note belongs to the authenticated user
    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
} 
 
// Create a new note
async function createNote(req, res) {

  const { title, content } = req.body;
  
  try {
    const note = await Note.create({
      title,
      content,
      user: req.user.id
    });
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }

}

// Update a note by ID
async function updateNote(req, res) {
  

  try {

    let note = await Note.findById(id);

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    // Check if the note belongs to the authenticated user
    if (note.user.toString() !== req.user.id.toString()) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    note.title = title;
    note.content = content;

    await note.save();

    res.json(note);


  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }

}

// Delete a note by ID
async function deleteNote(req, res) {
  
  const { id } = req.body;

  try {

    const note = await Note.findOneAndDelete({ _id: id, user: req.user.id });
    
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    
    res.status(200).json({ message: 'Note deleted successfully' });

    // Check if the note belongs to the authenticated user
    
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}

module.exports = {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
};
