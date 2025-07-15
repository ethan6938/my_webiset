// routes/notes.js
import express from 'express';
import Note from '../models/Note.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// router.get('/', protect, async (req, res) => {
//   const notes = await Note.find({ owner: req.user._id });
//   res.json(notes);
// });


// Delete a note by ID
router.delete('/:id', protect, async (req, res) => {
  const noteId = req.params.id;

  try {
    const deletedNote = await Note.findOneAndDelete({
      _id: noteId,
      owner: req.user._id,
    });

    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found or unauthorized" });
    }

    res.json({ message: "Note deleted" });
  } catch (error) {
    console.error('Failed to delete note:', error);
    res.status(500).json({ message: 'Failed to delete note' });
  }
});

// Update a note by ID
router.put('/:id', protect, async (req, res) => {
  const noteId = req.params.id;
  const { title, content } = req.body;

  try {
    // Only allow updating notes owned by the logged-in user
    const updatedNote = await Note.findOneAndUpdate(
      { _id: noteId, owner: req.user._id },
      { title, content },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found or unauthorized" });
    }

    res.json(updatedNote);
  } catch (error) {
    console.error('Failed to update note:', error);
    res.status(500).json({ message: 'Failed to update note' });
  }
});



router.get('/', protect, async (req, res) => {
  try {
    const notes = await Note.find({ owner: req.user._id });
    res.json(notes);
  } catch (err) {
    console.error('Failed to fetch notes:', err);
    res.status(500).json({ message: 'Failed to fetch notes' });
  }
});

router.post('/', protect, async (req, res) => {
  const { title, content } = req.body;
  const note = await Note.create({
    title,
    content,
    owner: req.user._id,
  });
  res.status(201).json(note);
});

export default router;
