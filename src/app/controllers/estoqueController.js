const db = require('../models/index');
const Produto = db.Produto;
const Estoque = db.Estoque;

module.exports = {
    async create(req, res) {
        try {
            // apenas o gerente pode iniciar o estoque?
            const estoque = await Estoque.create({
                quantidade: 0,
                cores: [],
            });
            return res.status(201).send();

        } catch (error) {
            return res.status(400).send({
                mensagem: "Erro ao iniciar estoque: " + error
            });
        }
    },
    async index(req, res) {
        try {
            const estoque = await Estoque.findAll();

            return res.status(200).send(estoque);
        } catch (error) {
            return res.status(400).send({msg: "Produtos não encontrados: " + error});
        }
    },
   
};
