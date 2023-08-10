const router = require('express').Router();
const { celebrate } = require('celebrate');
const {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
  addTag,
  removeTag,
} = require('../controllers/notes');
const { cardConfig, idConfig } = require('../utils/validationConfig');

router.get('/', getNotes);
router.post('/', createNote);
router.patch('/:id', celebrate(idConfig), updateNote);
router.delete('/:id', celebrate(idConfig), deleteNote);
router.put('/:id/tags', celebrate(idConfig), addTag);
router.delete('/:id/tags', celebrate(idConfig), removeTag);
// router.put('/:id/likes', celebrate(idConfig), likeCard);
// router.delete('/:id/likes', celebrate(idConfig), dislikeCard);

module.exports = router;
