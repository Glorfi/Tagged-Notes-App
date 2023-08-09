const Note = require('../models/note');
const NotFound = require('../utils/NotFound');
const NotAuthorized = require('../utils/NotAuthorized');
const WrongFormat = require('../utils/WrongFormat');

module.exports.getCards = (req, res, next) => {
  Note.find({})
    .sort({ createdAt: -1 })
    .then((cards) => {
      res.send(cards);
    })
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Note.create({ name, link, owner })
    .then((card) => {
      res.send(card);
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

module.exports.deleteCard = (req, res, next) => {
  const userId = req.user._id;
  Note.findById(req.params.id)
    .then((card) => {
      if (!card) {
        throw new NotFound('Карточка не найдена');
      }
      if (card.owner.toString() !== userId.toString()) {
        throw new NotAuthorized('Нет прав на удаление карточки');
      }
      return card.deleteOne();
    })
    .then((deletedCard) => res.send(deletedCard))
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Note.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFound('Карточка не найдена');
      }
      res.send(card);
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Note.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFound('Карточка не найдена');
      } else {
        res.send(card);
      }
    })
    .catch(next);
};
