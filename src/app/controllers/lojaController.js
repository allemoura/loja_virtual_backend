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
                endereco: endereco,
                contato,
                ehLojaMatriz
            });
            return res.status(201).json(loja.id);

        } catch (error) {
             return res.status(500).send({ msg: "Erro ao criar loja: " + error });
        }
    },
    async show(req, res) {
        try {
            const loja = await Loja.findByPk(req.params.id);

            if (!loja) {
                return res.status(404).send({ error: "loja não cadastrada." });
            }
            if (req.user_id == loja.id) {
                return res.status(200).send(loja);
            }
            return res.status(401).send({msg: "Permissão negada."});

        } catch (error) {
            return res.status(500).send({ msg: "Não foi possível buscar: " + error });
        }
    },
    async update(req, res) {
        try {
            const loja = await Loja.findByPk(req.params.id);
            const valores = req.body;

            if (!loja) {
                return res.status(404).send({ error: "loja nao encontrada." });
            }
            if (req.user_id == loja.id) {
                const hashed = await bcrypt.hash(valores.senha, 10);
                valores.senha = hashed;
                await loja.update(valores)
                return res.status(200).send({ msg: "Atualizado com sucesso." });
            }
            return res.status(401).send({ msg: "Permissão negada." });
            
        } catch (error) {
            return res.status(500).send({ msg: "Nao foi possivel atualizar: " + error });
        }
    },
    async delete(req, res) {
        try {
            const loja = await Loja.findByPk(req.params.id);
            if (!loja) {
                return res.status(404).send({ msg: "Nenhuma loja com este ID." });
                
            } else if (req.user_id == loja.id) {
                await Loja.destroy({
                    where: {id : req.params.id},
                });
                return res.status(200).send({ msg: "Removido com sucesso." });
            }
            return res.status(401).send({ msg: "Permissão negada." });

        } catch (error) {
            return res.status(400).send({ msg: "Nao foi possivel remover: " + error });
        }
    },
};