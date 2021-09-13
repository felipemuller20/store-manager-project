const salesModel = require('../models/salesModel');
// const productModel = require('../models/productModel');
const productSchema = require('../schema/productSchema');

// const checkQuantity = async (productId, quantity) => {
//   const findById = await productModel.getById(productId);
//   if (findById[0].quantity < quantity) {
//     return { code: 'stock_problem', message: 'Such amount is not permitted to sell' };
//   }
// };

const createSale = async (soldItems) => {
  let errorLog;
  soldItems.forEach(({ quantity }) => {
    const isQuantityValid = productSchema.validateQuantity(quantity);
    if (isQuantityValid) { 
      errorLog = { code: isQuantityValid.code, message: 'Wrong product ID or invalid quantity' };
    }
  });
if (errorLog !== undefined) return (errorLog);
const response = await salesModel.create(soldItems);
return { _id: response.id, itensSold: soldItems };
};

const findById = async (id) => {
 const idExists = productSchema.validateId(id);
  if (idExists === true) {
    const response = await salesModel.getById(id);
    if (response.length === 0) return ({ code: 'not_found', message: 'Sale not found' });
    return response[0];
  }
  return ({ code: 'not_found', message: 'Sale not found' });
};

const updateSale = async (id, soldItems) => {
  let errorLog;
  soldItems.forEach(({ quantity }) => {
    const isQuantityValid = productSchema.validateQuantity(quantity);
    if (isQuantityValid) { 
      errorLog = { code: isQuantityValid.code, message: 'Wrong product ID or invalid quantity' };
    }
  });
if (errorLog !== undefined) return (errorLog);
const response = await salesModel.update(id, soldItems);
if (response.result.ok === 1) return { _id: id, itensSold: soldItems };
};

// const deleteProduct = async (id) => {
//   const isIdValid = productSchema.validateId(id);
//   if (isIdValid !== true) return ({ code: isIdValid.code, message: isIdValid.message });

//   const product = await productModel.getById(id);
//   const deleted = await productModel.deleteById(id);

//   return { product, deleted };
// };

module.exports = {
  createSale,
  findById,
  updateSale,
  // deleteProduct,
};
