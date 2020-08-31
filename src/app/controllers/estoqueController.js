const db = require('../models/index');
const Estoque = db.Estoque;

module.exports = {
    async create(req, res) {
        try {
            // apenas o gerente pode iniciar o estoque?
            const estoque = await Estoque.create({
                quantidade: 0,
                cores: [],
            });
            return res.status(201).send(estoque.id);

        } catch (error) {
            return res.status(500).send({ mensagem: "Erro ao iniciar estoque: " + error });
        }
    },
    async index(req, res) {
        try {
            const estoques = await Estoque.findAll();
            return res.status(200).send(estoques);
            
        } catch (error) {
            return res.status(404).send({msg: "Produtos não encontrados: " + error});
        }
    },
   
};
