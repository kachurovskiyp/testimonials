const express = require('express');
const router = express.Router();
const SeatController = require('../controllers/seat.conroller');

router.get('/seats', SeatController.getAll);

router.get('/seats/random', SeatController.getRandom);

router.get('/seats/:id', SeatController.getById);

router.post('/seats', SeatController.addItem);

router.put('/seats/:id', SeatController.changeItem);

router.delete('/seats/:id', SeatController.deleteItem);

module.exports = router;