const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const DuplicatedEmail = require('../utils/DuplicatedEmail');
const NotFound = require('../utils/NotFound');
const WrongFormat = require('../utils/WrongFormat');
const AuthorizationRequired = require('../utils/AuthorizationRequired');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  const { _id } = req.user;
  User.findById(_id)
    .populate('notes')
    // eslint-disable-next-line consistent-return
    .then((user) => {
      if (!user) {
        throw new NotFound('The user is not found');
      }
      res.send(user);
    })
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .populate('notes')
    // eslint-disable-next-line consistent-return
    .then((user) => {
      if (!user) {
        return Promise.reject(new NotFound('The user is not found'));
      }
      res.send(user);
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const { name, surname, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({
        name,
        surname,
        email,
        password: hash,
      })
    )
    .then((user) => {
      const userData = {
        name: user.name,
        surname: user.surname,
        email: user.email,
      };
      res.status(201).send(userData);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const e = new WrongFormat('Wrong data format');
        next(e);
      } else if (err.code === 11000) {
        const duplicateEmailError = new DuplicatedEmail(
          'The user with this email already exists'
        );
        next(duplicateEmailError);
      } else {
        next(err);
      }
    });
};

module.exports.deleteCurrentUser = (req, res, next) => {
  const { _id } = req.user;
  User.findOneAndDelete(_id)
    .then((deletedUser) => res.send(deletedUser))
    .catch(next);
};

module.exports.updateUserInfo = (req, res, next) => {
  const { name, surname, email } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(
    userId,
    { name, surname, email },
    {
      new: true,
      runValidators: true,
    }
  )
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const e = new WrongFormat('Wrong Data format');
        next(e);
      } else next(err);
    });
};

// module.exports.updateUserAvatar = (req, res, next) => {
//   const { avatar } = req.body;
//   const userId = req.user._id;
//   User.findByIdAndUpdate(
//     userId,
//     { avatar },
//     {
//       new: true,
//       runValidators: true,
//     },
//   )
//     .then((user) => {
//       res.send(user);
//     })
//     .catch((err) => {
//       if (err.name === 'ValidationError') {
//         const e = new WrongFormat('Неверный формат передаваемых данных');
//         next(e);
//       } else next(err);
//     });
// };

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthorizationRequired('Wrong email or password');
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new AuthorizationRequired('Wrong email or password');
        }
        return user;
      });
    })
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        {
          expiresIn: '7d',
        }
      );
      res.cookie('jwt', token, {
        maxAge: 604800000,
        httpOnly: true,
      });
      res.send({ message: 'Logged-in Succesfully' }).end();
    })
    .catch(next);
};

module.exports.logout = (req, res) => {
  res
    .clearCookie('jwt', {
      maxAge: 604800000,
      httpOnly: true,
    })
    .end();
};
