// backend/server.js
const express = require('express');
const cors = require('cors');
const { Note } = require('./models');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Create a new note
app.post('/notes', async (req, res) => {
  try {
    const note = await Note.create(req.body);
    res.status(201).json(note);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all notes
app.get('/notes', async (req, res) => {
  try {
    const notes = await Note.findAll();
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a note by id
app.get('/notes/:id', async (req, res) => {
  try {
    const note = await Note.findByPk(req.params.id);
    if (note) {
      res.json(note);
    } else {
      res.status(404).json({ error: 'Note not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a note
app.put('/notes/:id', async (req, res) => {
  try {
    const [updated] = await Note.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedNote = await Note.findByPk(req.params.id);
      res.json(updatedNote);
    } else {
      res.status(404).json({ error: 'Note not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a note
app.delete('/notes/:id', async (req, res) => {
  try {
    const deleted = await Note.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Note not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
