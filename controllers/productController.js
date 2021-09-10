const productServices = require('../services/productServices');
const httpStatus = require('../utils/httpStatus');

const getAll = async (_req, res) => {
  const allProducts = await productServices.getAll();
  console.log(allProducts, 'product controller');
  return res.status(httpStatus.HTTP_OK_STATUS).json({ products: allProducts });
};

const getById = async (req, res) => {
  const { id } = req.params;
  const product = await productServices.getById(id);

  if (!product) {
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
        },
    });
  }
  return res.status(httpStatus.HTTP_OK_STATUS).json(product);
};

const create = async (req, res) => {
  const { name, quantity } = req.body;

  const newProduct = await productServices.create(name, quantity);

  return res.status(httpStatus.HTTP_CREATE_STATUS).json(newProduct);
};

module.exports = {
  getAll,
  getById,
  create,
};