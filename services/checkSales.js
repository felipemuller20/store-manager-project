const errors = require('./errors');
const salesModel = require('../models/salesModel');
// const https = require('./HttpsStatus');

// const NAME_LENGTH = 5;
const INVALID_QUANTITY = 0;

const checkSales = (arr) => {
  const sizeCheck = arr.find((item) => item.quantity <= INVALID_QUANTITY);
  const typeCheck = arr.find((item) => typeof item.quantity !== 'number');

  if (sizeCheck) {
    return { err: { code: 'invalid_data', message: errors.S_QUANTITY }, error: 422 };
  }
  if (typeCheck) {
    return { err: { code: 'invalid_data', message: errors.S_QUANTITY }, error: 422 };
  }
  return false;
};

const addSales = async (arr) => {
  const check = checkSales(arr);
  if (check) return check;

  const insertedSale = await salesModel.create(arr);

  return insertedSale;
};

const getAll = async () => {
  const allProducts = await salesModel.getAll();
  return allProducts;
};

const getSaleById = async (id) => {
  const sale = await salesModel.getSaleById(id);
  return sale;
};

const update = async (id, arr) => {
  const check = checkSales(arr);
  if (check) return check;
  const updateProduct = await salesModel.update(id, arr);
  if (updateProduct === false) {
    return { err: { code: 'invalid_data', message: errors.EXISTS }, error: 422 };
}
  return updateProduct;
};

// const drop = async (id) => {
//   const deleteProduct = await salesModel.drop(id);
//   if (deleteProduct === false) {
//     return { err: { code: 'invalid_data', message: 'Wrong id format' }, error: 422 };
// }
//   return deleteProduct;
// };

module.exports = {
  addSales,
  getAll,
  getSaleById,
  update,
  // drop,
};
