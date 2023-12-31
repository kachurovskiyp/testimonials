const express = require('express');
const router = express.Router();
const ConcertController = require('../controllers/concert.controller');

router.get('/concerts', ConcertController.getAll);

router.get('/concerts/random', ConcertController.getRandom);

router.get('/concerts/:id', ConcertController.getById);

router.post('/concerts', ConcertController.addItem);

router.put('/concerts/:id', ConcertController.changeItem);

router.delete('/concerts/:id', ConcertController.deleteItem);

module.exports = router;