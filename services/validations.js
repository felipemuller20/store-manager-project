const generateError = require('../utils/errorMessage');
const productsModel = require('../models/productsModel');

const regexName = /^([a-zA-Z\u00C0-\u017F ]{5,})/;

const INVALID_DATA = 'invalid_data';
const CHARACTER_LONG = '"name" length must be at least 5 characters long';
const QUANTITY_GT_1 = '"quantity" must be larger than or equal to 1';
const TYPE_MB_NUMBER = '"quantity" must be a number';
const PRODUCT_ALREADY_EXISTS = 'Product already exists';
const WRONG_ID_FORMAT = 'Wrong id format';

const notValidId = () => generateError(INVALID_DATA, WRONG_ID_FORMAT);

const validateName = (name) => {
  if (!regexName.test(name)) {
    return generateError(INVALID_DATA, CHARACTER_LONG);
  }
};

const validateAlreadyExists = async (name) => {
  if (await productsModel.getProductByName(name)) {
    return generateError(INVALID_DATA, PRODUCT_ALREADY_EXISTS);
  }
};

const verifyTypeQuantity = (quantity) => {
  if (typeof quantity !== 'number') {
    return generateError(INVALID_DATA, TYPE_MB_NUMBER);
  }
};

const verifyLengthQuantity = (quantity) => {
  if (quantity < 1) {
    return generateError(INVALID_DATA, QUANTITY_GT_1);
  }
};

const validationToCreate = async (name, quantity) => {
  if (validateName(name)) return validateName(name);
  const result = await validateAlreadyExists(name);
  if (result) return result;
  if (verifyTypeQuantity(quantity)) return verifyTypeQuantity(quantity);
  if (verifyLengthQuantity(quantity)) return verifyLengthQuantity(quantity);
};

const validateToUpdate = (name, quantity) => {
  if (validateName(name)) return validateName(name);
  if (verifyTypeQuantity(quantity)) return verifyTypeQuantity(quantity);
  if (verifyLengthQuantity(quantity)) return verifyLengthQuantity(quantity);
};

module.exports = {
  notValidId,
  validationToCreate,
  validateToUpdate,
};