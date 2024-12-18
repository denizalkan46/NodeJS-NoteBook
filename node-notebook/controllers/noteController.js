const Note = require('../models/noteModel');

// Not ekleme
const addNote = async (req, res) => {
  const { title, content } = req.body;
  try {
    const note = new Note({
      title,
      content,
      user: req.user.id,
    });

    await note.save();
    res.status(201).json({ message: 'Not başarıyla eklendi', note });
  } catch (error) {
    res.status(500).json({ error: 'Not eklenirken bir hata oluştu' });
  }
};

// Notları listeleme
const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: 'Notlar alınırken bir hata oluştu' });
  }
};

// Not güncelleme
const updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const note = await Note.findOneAndUpdate(
      { _id: id, user: req.user.id },
      { title, content, updatedAt: Date.now() },
      { new: true }
    );

    if (!note) {
      return res.status(404).json({ error: 'Not bulunamadı' });
    }

    res.json({ message: 'Not güncellendi', note });
  } catch (error) {
    res.status(500).json({ error: 'Not güncellenirken bir hata oluştu' });
  }
};

// Not silme
const deleteNote = async (req, res) => {
  const { id } = req.params;
  try {
    const note = await Note.findOneAndDelete({ _id: id, user: req.user.id });

    if (!note) {
      return res.status(404).json({ error: 'Not bulunamadı' });
    }

    res.json({ message: 'Not silindi' });
  } catch (error) {
    res.status(500).json({ error: 'Not silinirken bir hata oluştu' });
  }
};

module.exports = { addNote, getNotes, updateNote, deleteNote };
