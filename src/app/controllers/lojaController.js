const db = require('../models/index');
const Loja = db.Loja;


const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { create } = require('./gerenteController');

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
    }
};