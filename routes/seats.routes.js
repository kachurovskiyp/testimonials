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
  const { client, email, day, seat} = req.body;
  if (db.seats.find((obj) => obj.day === parseInt(day) && obj.seat === parseInt(seat))) {
    res.status(400).json({ message: "The slot is already taken..." });
  }

  db.seats.push({
    id: Math.floor(Math.random() * (1000 - db.seats.length + 1) + db.seats.length + 1),
    day: day,
    seat: seat,
    client: client,
    email: email
  });

  res.status(201).json({ message: 'OK' });
  req.io.emit('seatsUpdated', db.seats);
});

router.route('/seats/:id').put((req, res) => {
  const { day, seat } = req.body;
  let match = false;

  if(!day && !seat) res.json({ message: 'Error' });

  db.seats.forEach((obj) => {
    if(obj.id === parseInt(req.params.id)) {
      obj.day = day;
      obj.seat = seat;

      res.json({ message: 'OK' });
      match = true;
    }
  });

  if(!match) res.status(404).json({ message: 'Not found' });
});

router.route('/seats/:id').delete((req, res) => {
  db.seats = db.seats.filter((obj) => {
    return obj.id !== parseInt(req.params.id);
  });
  res.json({ message: 'OK' })
});

module.exports = router;