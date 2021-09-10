const validations = require('../schemas/validations');

const productsModel = require('../models/productsModel');

// const {
//   HTTP_OK_STATUS,
//   HTTP_CREATED_STATUS,
//   HTTP_NO_BODY_STATUS,
//   HTTP_401,
//   HTTP_NOT_FOUND_STATUS,
// } = require('../helpers/statusCode');

// module.exports = {
//   validCreateProducts,
// };

const createdProducts = async (name, quantity) => {
  const validParams = await validations.validProductsParams(name, quantity);
  if (validParams.err) return validParams;

  const productExists = await productsModel.findProductByName(name);
  if (productExists) {
    return {
      err: { code: 'invalid_data', message: 'Product already exists' },
    };
  }

  const createdProduct = await productsModel.createProduct(name, quantity);
  return createdProduct;
};

module.exports = {
  createdProducts,
};