const db = require('../config/db');
const bcrypt = require('bcrypt-nodejs');

const obterHash = (password, callback) => {
    bcrypt.genSalt(10, (err, salt) =>{
        bcrypt.hash(password, salt, null, (err, hash) => callback(hash));
    });
}

const save = (req, res) => {
    obterHash(req.body.password, (hash) => {
        const password = hash;
        db('usernames')
        .insert({
            name: req.body.name,
            email: req.body.email.toLowerCase(),
            password: password
        })
        .then(() => res.status(204).send('Registered'))
        .catch((err) => res.status(400).send('Erro ao cadastrar. Usuário talvez já exista.'))
    });
}

module.exports = {
    save
}
