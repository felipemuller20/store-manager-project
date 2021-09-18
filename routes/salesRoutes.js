const express = require('express');

const router = express.Router();
const { validateQuantities } = require('../middlewares/midValidationsSales');
const { registerSale, getAllSales, getById } = require('../controllers/salesControllers');

router.post('/', validateQuantities, registerSale);
router.get('/', getAllSales);
router.get('/:id', getById);

module.exports = router;