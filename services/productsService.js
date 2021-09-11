const model = require('../models/productsModel');
const { stringLenght, isString } = require('../schemas/strings');
const { largerThan } = require('../schemas/numbers');
const {
  codes: { invalidData },
  messages: { productAlreadyExists, productNameLength, quantityLarger, beANumber, wrongId },
} = require('../messages/messages');

const create = async (name, quantity) => {
  const existingProduct = await model.findByName(name);
  console.log('linha 11 service', existingProduct);

  if (stringLenght(name, 5)) {
    return ({ err: { code: invalidData, message: productNameLength } });
  }

  if (largerThan(quantity, 0)) {
    return ({ err: { code: invalidData, message: quantityLarger } });
  }

  if (isString(quantity)) {
    return ({ err: { code: invalidData, message: beANumber } });
  }

  if (existingProduct) {
    return ({ err: { code: invalidData, message: productAlreadyExists } });
  }

  return model.create(name, quantity);
};

const findAll = async () => {
  const products = await model.findAll();

  // if (products.length === 0) return ({ err: { code: invalidData, message: noData } });

  return products;
};

const findById = async (id) => {
  const product = await model.findById(id);

  if (!product) return ({ err: { code: invalidData, message: wrongId } });

  return product;
};

module.exports = {
  create,
  findAll,
  findById,
};
