const productModel = require('../models/products');

// function validate(name, quantity) {
//   if (name === undefined || typeof name !== 'string') {
//     return { code: 400, message: 'name não foi preenchido', isValid: false };
//   }
//   if (quantity === undefined || typeof quantity !== 'number') {
//     return { code: 400, message: 'quantity não foi preechido', isValid: false };
//   }
//   return { code: 201, message: 'deu bom', isValid: true };
// }

const createNewProduct = async (name, quantity) => {
  const newProduct = await productModel.create(name, quantity);
  return newProduct;
};

const getAll = async () => {
  const allProducts = await productModel.getAll();
  const result = await allProducts;
  // console.log(result);
  return result;
};

const getById = async (id) => {
  const product = await productModel.getProductsById(id);
  return product;
};
module.exports = {
  createNewProduct,
  getAll,
  getById,
};