const ProductsService = require('../services/productService');

const create = async (req, res) => {
  const { name, quantity } = req.body;

  const product = await ProductsService.create({ name, quantity });

  if (!product.name) {
    return res.status(422).json(product);
  }

  return res.status(201).json(product);
};

const getAll = async (_req, res) => {
  const product = await ProductsService.getAll();
  console.log(`${product} product`);
  if (product.err) {
    return res.status(422).json(product);
  }

  return res.status(200).json(product);
};

const getById = async (req, res) => {
  const { _id } = req.params;
  const product = await ProductsService.getById(_id);
  if (product.err) {
    return res.status(422).json(product);
  }

  return res.status(200).json(product);
};

const updateById = async (req, res) => {
  const { _id } = req.params;
  const { name, quantity } = req.body;
  const product = await ProductsService.updateById({ _id, name, quantity });
  if (product.err) {
    return res.status(422).json(product);
  }

  return res.status(200).json(product);
};

module.exports = {
  create,
  getById,
  getAll,
  updateById,
};
