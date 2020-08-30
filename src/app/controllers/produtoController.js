const db = require('../models/index');
const Produto = db.Produto;

module.exports = {
    async create(req, res) {
        try {
            // apenas o gerente pode criar
            const {nome, descricao, categoria, preco} = req.body;

            const produto = await Produto.create({
                nome,
                descricao,
                categoria,
                preco,
                desconto: 0,
                avaliacao: 0.0
            });
            return res.status(201).json(produto.id);

        } catch (error) {
            return res.status(400).send({
                mensagem: "Erro ao cadastrar produto: " + error
            });
        }
    },
    async update(req, res) {
        try {
            const produto = await Produto.findByPk(req.params.id);
            const valores = req.body;

            if (!produto) {
                return res.status(400).send({error: "Produto nao encontrado."});
            }
            if (req.produto_id == produto.id) {
                await produto.update(valores);
                return res.status(200).send({mensagem: "Atualizado com sucesso." });
            }
            
            return res.status(401).send({
                mensagem: "Permissão negada."
            });
            
        } catch (error) {
            return res.status().send({mensagem: "Nao foi possivel atualizar: " + error});
        }
    },
    async index(req, res) {
        try {
            const produtos = await Produto.findAll();

            return res.status(200).send(produtos);
        } catch (error) {
            return res.status(400).send({msg: "Produtos não encontrados: " + error});
        }
    },
    async delete(req ,res) {
        // try {
        //     const cliente = Cliente.findByPk(req.params.id);

        //     if (req.cliente_id == cliente.id) {
        //         await Cliente.destroy({
        //             where: {id : req.params.id},
        //         });
        
        //         return res.status(200).send({
        //             msg: "Usuario removido com sucesso.",
        //         });
        //     }
        //     return res.status(401).send({
        //         mensagem: "Permissão negada."
        //     });

        // } catch (error) {
        //     return res.status(400).send({
        //         msg: "Nao foi possivel remover: " + error,
        //     });
        // }

        // apenas o gerente pode deletar
    },
   
};
