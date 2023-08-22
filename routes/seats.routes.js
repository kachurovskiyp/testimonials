const express = require('express');
const router = express.Router();
const db = require('../db');

router.route('/seats').get((req, res) => {
  res.json(db.seats);
});

router.route('/seats/random').get((req, res) => {
  const allId = [];
  db.seats.forEach((elem) => {allId.push(elem.id)});
  const id = Math.floor(Math.random() * allId.length + 1);
  res.json(db.seats.find((obj) => obj.id === id));
});

router.route('/seats/:id').get((req, res) => {
  res.json(db.seats.find((obj) => obj.id === parseInt(req.params.id)));
});

router.route('/seats').post((req, res) => {
  const { author, text } = req.body;

  if(!author && !text) res.status(400).json({ message: 'Error' });

  db.seats.push({
    id: Math.floor(Math.random() * (1000 - db.seats.length + 1) + db.seats.length + 1),
    author: author,
    text: text
  });

  res.status(201).json({ message: 'OK' });
});

router.route('/seats/:id').put((req, res) => {
  const { author, text } = req.body;
  let match = false;

  if(!author && !text) res.json({ message: 'Error' });

  db.seats.forEach((obj) => {
    if(obj.id === parseInt(req.params.id)) {
      obj.author = author;
      obj.text = text;

      res.json({ message: 'OK' });
      match = true;
    }
  });

  if(!match) res.status(404).json({ message: 'Not found' });
});

router.route('/seats/:id').delete((req, res) => {
  db.seats = db.seats.filter((obj) => {
    console.log(parseInt(req.params.id));
    console.log('obj.id: ', obj.id);
    return obj.id !== parseInt(req.params.id);
  });
  res.json({ message: 'OK' })
});

module.exports = router;