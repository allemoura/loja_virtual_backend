const db = require('../models/index');
const Cliente = db.Cliente;

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    async create(req, res) {
        try {
            const {email, senha, nome, cpf, data_nasc, telefone} = req.body;
            const hashed = await bcrypt.hash(senha, 10);

            const cliente = await Cliente.create({
                email,
                senha: hashed, 
                nome,
                cpf,
                data_nasc,
                telefone
            });
            return res.status(201).json(cliente.id);

        } catch (error) {
            return res.status(400).send({
                mensagem: "Erro ao cadastrar cliente: " + error
            });
        }
    },
    async update(req, res) {
        try {
            const cliente = await Cliente.findByPk(req.params.id);
            const valores = req.body;

            if (!cliente) {
                return res.status(400).send({error: "Cliente nao encontrado."});
            }
            if (req.cliente_id == cliente.id) {
                await cliente.update(valores)
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
            const cliente = await Cliente.findByPk(req.cliente_id);
            if (!cliente) {
                res.status(401).send({mensagem: "Cliente nao cadastrado."});
            }
            const clientes = await Usuario.findAll();

            return res.status(200).send(clientes);
        } catch (error) {
            return res.status(400).send({msg: "Clientes não encontrados: " + error});
        }
    },
    async show(req, res) {
        try {
            const cliente = await Cliente.findByPk(req.params.id);

            if (!cliente) {
                return res.status(400).send({
                    error: "Cliente não cadastrado."
                });
            }
            // n expor informações sensíveis
            return res.status(200).send(cliente);   

        } catch (error) {
            return res.status(400).send({
                msg: "Não foi possível buscar: " + error
            });
        }
    },
    async delete(req ,res) {
        try {
            const cliente = Cliente.findByPk(req.params.id);

            if (req.user_id == cliente.id) {
                await Cliente.destroy({
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
