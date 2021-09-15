const bodyParser = require('body-parser');
const express = require('express');

const ProductControllers = require('./controllers/products');
const SalesControllers = require('./controllers/sales');

const app = express();

app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// 1 - Crie um endpoint para o cadastro de produtos
app.post('/products', ProductControllers.create);

// 2 - Crie um endpoint para listar os produtos
app.get('/products', ProductControllers.getAll);
app.get('/products/:id', ProductControllers.findById);

// 3 - Crie um endpoint para atualizar um produto
app.put('/products/:id', ProductControllers.update);

// 4 - Crie um endpoint para deletar um produto
app.delete('/products/:id', ProductControllers.exclude);

// 5 - Crie um endpoint para cadastrar vendas
app.post('/sales', SalesControllers.create);

// 6 - Crie um endpoint para listar as vendas
app.get('/sales', SalesControllers.getAll);
app.get('/sales/:id', SalesControllers.findById);

// 7 - Crie um endpoint para atualizar uma venda
app.put('/sales/:id', SalesControllers.update);

// 8 - Crie um endpoint para deletar uma venda
// 9 - Atualize a quantidade de produtos
// 10 - Valide a quantidade de produtos

// Bônus
// 11 - Escreva testes para seus models
// 12 - Escreva testes para seus services
// 13 - Escreva testes para seus controllers

app.listen(PORT, () => console.log('O APP está "ON !!!"'));
