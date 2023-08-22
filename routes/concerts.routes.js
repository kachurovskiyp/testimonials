const express = require('express');
const router = express.Router();
const db = require('../db');

router.route('/concerts').get((req, res) => {
  res.json(db.concerts);
});

router.route('/concerts/random').get((req, res) => {
  const allId = [];
  db.concerts.forEach((elem) => {allId.push(elem.id)});
  const id = Math.floor(Math.random() * allId.length + 1);
  res.json(db.concerts.find((obj) => obj.id === id));
});

router.route('/concerts/:id').get((req, res) => {
  res.json(db.concerts.find((obj) => obj.id === parseInt(req.params.id)));
});

router.route('/concerts').post((req, res) => {
  const { author, text } = req.body;

  if(!author && !text) res.status(400).json({ message: 'Error' });

  db.concerts.push({
    id: Math.floor(Math.random() * (1000 - db.concerts.length + 1) + db.concerts.length + 1),
    author: author,
    text: text
  });

  res.status(201).json({ message: 'OK' });
});

router.route('/concerts/:id').put((req, res) => {
  const { author, text } = req.body;
  let match = false;

  if(!author && !text) res.json({ message: 'Error' });

  db.concerts.forEach((obj) => {
    if(obj.id === parseInt(req.params.id)) {
      obj.author = author;
      obj.text = text;

      res.json({ message: 'OK' });
      match = true;
    }
  });

  if(!match) res.status(404).json({ message: 'Not found' });
});

router.route('/concerts/:id').delete((req, res) => {
  db.concerts = db.concerts.filter((obj) => {
    return obj.id !== parseInt(req.params.id);
  });
  res.json({ message: 'OK' })
});

module.exports = router;