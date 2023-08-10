const Note = require('../models/note');
const User = require('../models/user');
const NotFound = require('../utils/NotFound');
const NotAuthorized = require('../utils/NotAuthorized');
const WrongFormat = require('../utils/WrongFormat');
const note = require('../models/note');
const { error } = require('winston');

module.exports.getNotes = (req, res, next) => {
  Note.find({})
    .sort({ createdAt: -1 })
    .then((notes) => {
      res.send(notes);
    })
    .catch(next);
};

module.exports.createNote = (req, res, next) => {
  const owner = req.user._id;
  Note.create({ owner })
    .then((note) => {
      return User.findById(owner)
        .then((user) => {
          user.notes.push(note._id);
          return user.save();
        })
        .then(() => res.send(note));
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err);
      if (err.name === 'ValidationError') {
        const e = new WrongFormat('Неверный формат передаваемых данных');
        next(e);
      } else {
        next(err);
      }
    });
};

module.exports.updateNote = (req, res, next) => {
  const owner = req.user._id;
  const { title, text } = req.body;
  Note.findById(req.params.id)
    .then((note) => {
      if (!note) {
        throw new NotFound('Note is not found');
      }
      if (note.owner.toString() !== owner.toString()) {
        throw new NotAuthorized('Not authorized to update the note');
      } else {
        note.title = title;
        note.text = text;
        note.updatedAt = Date.now();
        return note.save();
      }
    })
    .then((updatedNote) => {
      res.send(updatedNote);
    })
    .catch(next);
};

module.exports.deleteNote = (req, res, next) => {
  const owner = req.user._id;
  Note.findById(req.params.id)
    .then((note) => {
      if (!note) {
        throw new NotFound('Note is not found');
      }
      if (note.owner.toString() !== owner.toString()) {
        throw new NotAuthorized('Not authorized to update the note');
      }
      return note.deleteOne();
    })
    .then((deletedNote) => res.send(deletedNote))
    .catch(next);
};

module.exports.addTag = (req, res, next) => {
  const owner = req.user._id;
  const { tag } = req.body;
  Note.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { tags: tag } },
    { new: true }
  )
    .then((note) => {
      if (!note) {
        throw new NotFound('Note is not found');
      }
      if (note.owner.toString() !== owner.toString()) {
        throw new NotAuthorized('Not authorized to update the note');
      }
      res.send(note);
    })
    .catch(next);
};

module.exports.removeTag = (req, res, next) => {
  const owner = req.user._id;
  const { tag } = req.body;
  Note.findByIdAndUpdate(req.params.id, { $pull: { tags: tag } }, { new: true })
    .then((note) => {
      if (!note) {
        throw new NotFound('Note is not found');
      }
      if (note.owner.toString() !== owner.toString()) {
        throw new NotAuthorized('Not authorized to update the note');
      }
      res.send(note);
    })
    .catch(next);
};

// тэги в массиве чувствительны к кейсу
