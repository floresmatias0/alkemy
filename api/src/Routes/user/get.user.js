const server = require('express').Router();
const { getUserById } = require('../../Controllers/user/get.user');
const { User } = require('../../db.js');


server.get('/', (req, res, next) => { 
    User.findAll()
    .then(users => {
        res.status(201).json(users);
    }) 
    .catch(error => {
        console.log(error)
        res.status(400).send(error.message)
    })
});

server.get('/:idUser', (req, res, next) => { 
    const {idUser} = req.params
 
    getUserById(idUser)
    .then(user => {
        console.log(user)
        res.status(201).json(user);
    }) 
    .catch(error => {
        console.log(error)
        res.status(400).send(error.message)
    })
});

module.exports = server;