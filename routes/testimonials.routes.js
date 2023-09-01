const express = require('express');
const router = express.Router();
const TestimionalController = require('../controllers/testimonials.controller');

router.get('/testimonials', TestimionalController.getAll);

router.get('/testimonials/random', TestimionalController.getRandom);

router.get('/testimonials/:id', TestimionalController.getById);

router.post('/testimonials', TestimionalController.addItem);

router.put('/testimonials/:id', TestimionalController.changeItem);

router.delete('/testimonials/:id', TestimionalController.deleteItem);

module.exports = router;