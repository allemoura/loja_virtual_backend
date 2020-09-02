const db = require('../models/index');
const Estoque = db.Estoque;
const Loja = db.Loja;

module.exports = {
    async create(req, res) {
        try {
            const loja = await Loja.findByPk(req.params.id);

            if (!loja) return res.status(404).send("Loja nao encontrada.");

            if (req.user_id == loja.id) {
                const estoque = await Estoque.create({
                    quantidade: 0,
                    cores: [],
                    loja_id: loja.id
                });
                return res.status(201).json(estoque.id);
            }
            return res.status(401).send({ msg:"Permissão negada." });

        } catch (error) {
            return res.status(500).send({ mensagem: "Erro ao iniciar estoque: " + error });
        }
    },
    async show(req, res) {
        try {
            const estoque = await Estoque.findByPk(req.params.estoque_id);
            return res.status(200).send(estoque);
            
        } catch (error) {
            return res.status(404).send({msg: "Produtos não encontrados: " + error});
        }
    },
   
};
