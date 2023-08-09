const jwt = require('jsonwebtoken');
const AuthorizationRequired = require('../utils/AuthorizationRequired');

const { NODE_ENV, JWT_SECRET } = process.env;

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (error) {
    const e = new AuthorizationRequired('Необходима авторизация');
    return next(e);
  }
  req.user = payload;
  next();
};
