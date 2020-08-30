const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

function authentication(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) return res.status(401).json({auth: false, message: 'Token não enviado.'});
  
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
        if (err) {
            return res.status(500).json({ auth: false, message: 'Falha. Token nao e valido'});
        }
        req.user_id = decoded.id;
        next();
    });
}

module.exports = authentication;