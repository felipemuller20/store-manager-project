const productsService = require('../services/productsService');

const create = async (req, res) => {
  const { name, quantity } = req.body;

  const { product, message } = await productsService.create(name, quantity);
  if (message) return res.status(422).json({
    err: {
      code: "invalid_data",
      message
    }
  });

  return res.status(201).json({...product});
};

const getAll = async (_req, res) => {
  const products = await productsService.getAllProducts();
  return res.status(200).json({products});
}

const getProductById = async (req, res) => {
  const { id } = req.params;
  const { product, message } = await productsService.getProductById(id);
  if (message) return res.status(422).json({
    err: {
      code: "invalid_data",
      message
    }
  })
  return res.status(200).json(product)
}

const editProduct = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const { changedProduct, message } = await productsService.modifyProduct(id, name, quantity);
  if (message) return res.status(422).json({
    err: {
      code: "invalid_data",
      message
    }
  });
  return res.status(200).json(changedProduct);
}

const remove = async (req, res) => {
  const { id } = req.params;
  const { product, message } = await productsService.remove(id);

  if(message) return res.status(422).json({
    err: {
      code: "invalid_data",
      message
    }
  })
  return res.status(200).json(product);
}

module.exports = {
  create,
  getAll,
  getProductById,
  editProduct,
  remove,
};