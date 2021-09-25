const server = require('express').Router();
const { getOperationById, getAllOperations } = require('../../Controllers/operations/get.operations')


server.get('/', (req, res, next) => { 
    getAllOperations()
    .then(op => res.status(200).json(op)) 
    .catch(error => res.status(401).send(error.message))
});

server.get('/:idOperation', (req, res, next) => { 
    const { idOperation } = req.params
 
    getOperationById(idOperation)
    .then(user => res.status(201).json(user)) 
    .catch(error => res.status(401).send(error.message))
});

module.exports = server;