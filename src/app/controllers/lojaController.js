const db = require('../models/index');
const Loja = db.Loja;

const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    async create(req, res) {
        try {
            const {
                nome_loja, email, senha, endereco, contato, ehLojaMatriz
            } = req.body;
            const hashed = await bcrypt.hash(senha, 10);

            const loja = await Loja.create({
                nome_loja,
                email,
                senha: hashed,
                endereco,
                contato,
                ehLojaMatriz
            });
            return res.status(201).json(loja.id);

        } catch (error) {
             return res.status(400).send({
                mensagem: "Erro ao criar loja: " + error
            });
        }
    },
    async show(req, res) {
        try {
            const loja = await Loja.findByPk(req.params.id);

            if (!loja) {
                return res.status(400).send({
                    error: "loja não cadastrada."
                });
            }
            // n expor informações sensíveis
            return res.status(200).send(loja);   

        } catch (error) {
            return res.status(400).send({
                msg: "Não foi possível buscar: " + error
            });
        }
    },
    async update(req, res) {
        try {
            const loja = await Loja.findByPk(req.params.id);
            const valores = req.body;

            if (!loja) {
                return res.status(400).send({error: "loja nao encontrada."});
            }
            if (req.user_id == loja.id) {
                await loja.update(valores)
                return res.status(200).send({mensagem: "Atualizado com sucesso." });
            }
            
            return res.status(401).send({
                mensagem: "Permissão negada."
            });
            
        } catch (error) {
            return res.status().send({mensagem: "Nao foi possivel atualizar: " + error});
        }
    },
    async delete(req, res) {
        try {
            const loja = Loja.findByPk(req.params.id);

            if (req.user_id == loja.id) {
                await Loja.destroy({
                    where: {id : req.params.id},
                });
        
                return res.status(200).send({
                    msg: "Removido com sucesso.",
                });
            }
            return res.status(401).send({
                mensagem: "Permissão negada."
            });

        } catch (error) {
            return res.status(400).send({
                msg: "Nao foi possivel remover: " + error,
              });
        }
    },
};