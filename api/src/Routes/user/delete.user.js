const server = require('express').Router();
const { deleteUserById } = require('../../Controllers/user/delete.user')

server.delete('/delete/:idUser', (req, res, next) => { 
    const { idUser } = req.params
    deleteUserById(idUser)
    .then(() => res.status(201).send("User delete successfully"))
    .catch(err => res.status(401).send(err.message))
});

module.exports = server;