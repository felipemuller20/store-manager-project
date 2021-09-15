const express = require('express');
const bodyParse = require('body-parser');

const app = express();
const SERVER_PORT = 3000;

app.use(bodyParse.json());

const serviceProducts = require('./services/products');
const serviceSales = require('./services/sales');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', async (_req, res) => {
  const allProducts = await serviceProducts.getAll();
  return res.status(200).json({ products: allProducts });
});

app.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  const product = await serviceProducts.getById(id);
  if (product.err1) return res.status(product.err2.errCode).json(product.err1);
  return res.status(200).json(product);
});

app.post('/products', async (req, res) => {
  const { name, quantity } = req.body;
  const newProduct = await serviceProducts.create(name, quantity);
  
  if (newProduct.err1) {
 return res.status(newProduct.err2.errCode)
  .json(newProduct.err1); 
}

  return res.status(201).json(newProduct);
});

app.put('/products/:id', async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const updateProduct = await serviceProducts.update(id, name, quantity);

  if (updateProduct.err1) {
    return res.status(updateProduct.err2.errCode).json(updateProduct.err1);
  }
  return res.status(200).json(updateProduct);
});

app.delete('/products/:id', async (req, res) => {
  const { id } = req.params;
  const removedItem = await serviceProducts.remove(id);
  if (removedItem.err1) {
    return res.status(removedItem.err2.errCode).json(removedItem.err1);
  }
  return res.status(200).json(removedItem);
});

app.post('/sales', async (req, res) => {
  const create = await serviceSales.create(req.body);
  if (create.err1) return res.status(create.err2.errCode).json(create.err1);
  return res.status(200).json(create);
});

app.get('/sales', async (_req, res) => {
  const allProducts = await serviceSales.getAll();
  console.log(allProducts);
  return res.status(200).json(allProducts);
});

app.get('/sales/:id', async (req, res) => {
  const { id } = req.params;
  const product = await serviceSales.getById(id);
  console.log(product);
  if (product.err1) {
    return res.status(product.err2.errCode).json(product.err1);
  }
  return res.status(200).json(product);
});

app.listen(SERVER_PORT, () => console.log('servidor rodando!!'));