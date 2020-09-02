const db = require('../models/index');
const Cliente = db.Cliente;
const Gerente = db.Gerente;

const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    async create(req, res) {
        try {
            const {email, senha, nome, cpf, data_nasc, telefone} = req.body;
            
            const cliente = await Cliente.findOne({where: {email: email}});
            if (cliente)  return res.status().send({ msg: "Email já cadastrado." });
            
            const hashed = await bcrypt.hash(senha, 10);

            const clienteAux = await Cliente.create({
                email,
                senha: hashed, 
                nome,
                cpf,
                data_nasc,
                telefone
            });
            return res.status(201).json(clienteAux.id);

        } catch (error) {
            return res.status(500).send({ msg: "Erro ao cadastrar cliente: " + error });
        }
    },
    async update(req, res) {
        try {
            const cliente = await Cliente.findByPk(req.params.id);
            const valores = req.body;

            if (!cliente) {
                return res.status(400).send({ error: "Cliente nao encontrado." });
            }
            if (req.user_id == cliente.id) {
                await cliente.update(valores);
                return res.status(200).send({msg: "Atualizado com sucesso." });
            }
            return res.status(401).send({ msg: "Permissão negada." });
            
        } catch (error) {
            return res.status(500).send({msg: "Nao foi possivel atualizar: " + error});
        }
    },
    async index(req, res) {
        try {
            const gerente = await Gerente.findByPk(req.params.id);
            if (!gerente) {
                return res.status(400).send({msg: "Gerente nao cadastrado."});
            }
            if (req.user_id == gerente.id) {
                const clientes = await Cliente.findAll();
                return res.status(200).send(clientes); // dto
            }
            return res.status(401).send({msg: "Permissão negada."});

        } catch (error) {
            return res.status(500).send({msg: "Clientes não encontrados: " + error});
        }
    },
    async show(req, res) {
        try {
            const cliente = await Cliente.findByPk(req.params.id);

            if (!cliente) {
                return res.status(400).send({ error: "Cliente não cadastrado." });
            }
            return res.status(200).send(cliente); // dto  

        } catch (error) {
            return res.status(400).send({ msg: "Não foi possível buscar: " + error });
        }
    },
    async delete(req ,res) {
        try {
            const cliente = await Cliente.findByPk(req.params.id);

            if (req.user_id == cliente.id) {
                await Cliente.destroy({
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
