const router = require('express').Router();
const fs = require('fs');
const path = require('path');

const usersPath = path.join('.', 'data', 'users.json');

router.get('/users', (req, res) => {
  fs.readFile(usersPath, { encoding: 'utf8' }, (err, data) => {

    if (err) {
      res
        .status(404)
        .send({ message: 'Запрашиваемый ресурс не найден' });
      return;
    }
    res
      .send(JSON.parse(data));
  });
});

router.get('/users/:_id', (req, res) => {
  fs.readFile(usersPath, { encoding: 'utf8' }, (err, data) => {

    if (err) {
      res
        .status(404)
        .send({ message: 'Запрашиваемый ресурс не найден' });
      return;
    }

    const user = JSON.parse(data).find((item) => item._id === req.params._id);

    if (!user) {
      res
        .status(404)
        .send({ message: 'Нет пользователя с таким id' });
      return;
    }
    res
      .send(user);
  });
});

module.exports = router;

