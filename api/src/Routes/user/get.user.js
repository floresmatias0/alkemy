const server = require('express').Router();
const { getUserById, getAllUsers } = require('../../Controllers/user/get.user');

server.get('/', (req, res, next) => { 
    getAllUsers()
    .then(users => res.status(201).json(users)) 
    .catch(error => res.status(401).send(error.message))
});

server.get('/:idUser', (req, res, next) => { 
    const {idUser} = req.params
    getUserById(idUser)
    .then(user => res.status(201).json(user)) 
    .catch(error => res.status(401).send(error.message))
});

module.exports = server;