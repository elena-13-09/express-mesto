const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');

const cardsRouter = require('./routes/cards');
const usersRouter = require('./routes/users');

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();
// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

// ограничение количества запросов
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: 'Повторите запрос позже'
});

// применить ко всем запросам
app.use(limiter);

app.use((req, res, next) => {
  req.user = {
    _id: '5f6a53856db0c1056c526531', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };
  next();
});

// body parser error catcher
app.use((err, req, res, next) => {
  if (err) {
    res.status(500).send({ message: 'На сервере произошла ошибка' });
  } else {
    next();
  };
});

app.use('/', cardsRouter);

app.use('/', usersRouter);

app.use((req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});

// СПАСИБО))