const server = require('express').Router();
const { updateUserById } = require('../../Controllers/user/put.user.js');
const { User } = require('../../db.js');


server.put('/update/:idUser', (req, res, next) => { 
    const { idUser } = req.params
    const { name,surname,email } = req.body

    updateUserById(idUser,name,surname,email)
    .then(user => {
        res.status(201).json(user)
    })
    .catch(err => {
        res.status(400).send(err.message)
    })
});

module.exports = server;