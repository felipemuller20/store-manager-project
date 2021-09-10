const express = require('express');
const bodyParser = require('body-parser');
const productController = require('./controller/productController');

const app = express();
const SERVER_PORT = 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', productController.addProduct);

app.listen(SERVER_PORT, () => console.log(`Servidor rodando na porta: ${SERVER_PORT}`));
