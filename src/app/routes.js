const { Router } = require('express');
const bodyParser = require('body-parser');

const clienteController = require('./controllers/clienteController');
const gerenteController = require('./controllers/gerenteController');
const lojaController = require('./controllers/lojaController');
const sessionController = require('./controllers/sessionController');
const estoqueController = require('./controllers/estoqueController');

const authentication = require('./auth');
const produtoController = require('./controllers/produtoController');

const routes = Router();

routes.use(bodyParser.urlencoded({ extended: false }));
routes.use(bodyParser.json());

routes.get("/", (req, res) => {
    res.status(200).send({
        title: "API",
        version: "0.0.1"
    });
});
// CLIENTE
routes.post('/cadastro/cliente', clienteController.create);
routes.post('/login/cliente', sessionController.login);
routes.put('/cliente/:id', authentication, clienteController.update);
routes.get("/cliente/:id", authentication, clienteController.show);
routes.delete("/cliente/:id", authentication, clienteController.delete);
routes.get("/gerente/:id/clientes", authentication, clienteController.index);
// GERENTE
routes.post('/cadastro/:loja_id/gerente', gerenteController.create);
routes.post('/login/gerente', sessionController.login);
routes.get('/gerente/:id', authentication, gerenteController.show);
routes.put("/gerente/:id", authentication, gerenteController.update);
routes.delete('/gerente/:id', authentication, gerenteController.delete);
routes.put('/gerente/authorize/:id/', authentication, gerenteController.autorizar);
// LOJA
routes.post('/cadastro/loja', lojaController.create);
routes.post('/login/loja', sessionController.login);
routes.get('/loja/:id', authentication, lojaController.show);
routes.put('/loja/:id', authentication, lojaController.update);
routes.delete('/loja/:id', authentication, lojaController.delete);
// ESTOQUE
routes.post('/loja/:id/estoque', authentication, estoqueController.initiate);
routes.get('/loja/:id/estoque/:estoque_id', authentication, estoqueController.show);
//routes.post('/loja/:id/:gerente_id/estoque/:estoque_id/add', authentication, estoqueController.create);


module.exports = routes;