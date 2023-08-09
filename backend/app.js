require('dotenv').config();

const { PORT = 4000 } = process.env;
const express = require('express');
const mongoose = require('mongoose');
const { celebrate, errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const { credentialsConfig } = require('./utils/validationConfig');
// const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

const { login, createUser } = require('./controllers/users');
// const auth = require('./middlewares/auth');
const handleErrors = require('./middlewares/handleErrors');
const NotFound = require('./utils/NotFound');
const corshandler = require('./middlewares/corshandler');

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/notesdb', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  autoIndex: true,
});
app.use(corshandler);
app.use(cookieParser());
// app.use(requestLogger);

app.post('/signup', celebrate(credentialsConfig), createUser);
app.post('/signin', celebrate(credentialsConfig), login);
// app.use(auth);
// app.use(rootRouter);
// app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

// app.get('/signout', logout);
app.use((req, res, next) => {
  const err = new NotFound('Неверный путь');
  next(err);
});
// app.use(errorLogger);
app.use(errors());
app.use(handleErrors);

app.listen(PORT);
