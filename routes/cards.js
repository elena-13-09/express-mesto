const router = require('express').Router();
const fs = require('fs');
const path = require('path');

const cardsPath = path.join('.', 'data', 'cards.json');

router.get('/cards', (req, res) => {
  fs.readFile(cardsPath, { encoding: 'utf8' }, (err, data) => {
    if (err) {
      res
        .status(500)
        .send({ message: 'Запрашиваемый ресурс не найден' });
      return;
    }
    res
      .send(JSON.parse(data));
  });
});

module.exports = router;
