const ProductsModel = require('../models/ProductsModel');
// const SalesModel = require('../models/SalesModel');

const errors = {
  QUANTITY_AMOUNT: 'Wrong product ID or invalid quantity',
  TYPEOF_QUANTITY: 'Wrong product ID or invalid quantity',
  NAME_ALREADY_EXISTS: 'Wrong product ID or invalid quantity',
};
const status = 422;
const code = 'invalid_data';

const isGreaterThan = (value, min) => (value < min);
const typeOf = (value) => (typeof value === 'string');
const isExist = async (value) => {
  const product = await ProductsModel.getById(value);
  if (!product) return true;
};

const validatePost = async (itensSold) => {
  const { productId, quantity } = itensSold[0];
  switch (true) {
    case isGreaterThan(quantity, 1): return { status, code, message: errors.QUANTITY_AMOUNT };
    case typeOf(quantity): return { status, code, message: errors.TYPEOF_QUANTITY };
    case (await isExist(productId)): return { status, code, message: errors.NAME_ALREADY_EXISTS };
    default: return {};
  }
};

// const validateGet = async (id) => {
//   const product = await ProductsModel.getById(id);  
//   if (!product) return { status, code, message: errors.INVALID_PRODUCT };
//   return {};
// };

// const validatePut = (name, quantity) => {
//   switch (true) {
//     case isLengthLetterThan(name, 5): return { status, code, message: errors.NAME_LENGTH };
//     case isGreaterThan(quantity, 1): return { status, code, message: errors.QUANTITY_AMOUNT };
//     case typeOf(quantity): return { status, code, message: errors.TYPEOF_QUANTITY };
//     default: return {};
//   }
// };

module.exports = {
  validatePost,
  // validateGet,
  // validatePut,
};