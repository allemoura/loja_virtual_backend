const { Router } = require('express');
const bodyParser = require('body-parser');

const clienteController = require('./controllers/clienteController');
const gerenteController = require('./controllers/gerenteController');
const lojaController = require('./controllers/lojaController');
const sessionController = require('./controllers/sessionController');

const authentication = require('./auth');
//const authGerente = require('./authGerente');

const routes = Router();

routes.use(bodyParser.urlencoded({ extended: false }));
routes.use(bodyParser.json());

routes.get("/", (req, res) => {
    res.status(200).send({
        title: "API",
        version: "0.0.1"
    });
});

//routes.post('/login/cliente', sessionController.login);
routes.post('/cadastro/cliente', clienteController.create);
routes.put('/cliente/:id', authentication, clienteController.update);
routes.get("/cliente/:id", authentication, clienteController.show);
routes.delete("/cliente/:id", authentication, clienteController.delete);


routes.post('/cadastro/gerente', gerenteController.create);
//routes.post('/login/gerente', sessionController.login);
routes.get('/gerente/:id', gerenteController.show);
routes.put("/gerente/:id", gerenteController.update);
routes.delete('/gerente/:id', gerenteController.delete);
// apenas gerentes tem acesso
routes.get("/gerente/:id/clientes", clienteController.index);


routes.post('/cadastro/loja', lojaController.create);
routes.post('/login/loja', sessionController.login);



module.exports = routes;