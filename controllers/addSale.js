const rescue = require('express-rescue');
const { addNewSale } = require('../models/SalesModel');
const { validateProductIds, validateJoi } = require('../services/SalesServices');

const code = 'invalid_data';

module.exports = [
  (req, res, next) => {
    const productsSold = req.body;
    try {
      validateJoi(productsSold);
      next();
    } catch (e) {
      res.status(422).json({ err: {
        code,
        message: e.message },
      });
    }
  },

  rescue(async (req, res, next) => {
    const productsSold = req.body;
    try {
      await validateProductIds(productsSold);
      next();
    } catch (e) {
      res.status(422).json({ err: {
        code,
        message: e.message },
      });
    }
  }),

  rescue(async (req, res) => {
    const productsSold = req.body;
    const sale = await addNewSale(productsSold);
        res.status(200).json(sale);
  }),
];