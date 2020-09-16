const express = require('express');

const path = require('path');
// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();

const cardsRouter = require('./routes/cards');

const usersRouter = require('./routes/users');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', cardsRouter);

app.use('/', usersRouter);

app.all('*', (req, res) => {
  res
    .status(404)
    .send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT);
