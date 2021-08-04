const server = require('express').Router();
const { updateOperationById } = require('../../Controllers/operations/put.operations')

server.put('/update/:idOperation', async(req, res, next) => { 
    let { idOperation } = req.params
    let { concept, mount, type } = req.body
    
    updateOperationById(idOperation,concept,mount,type)
    .then(operation => res.status(201).json(operation))
    .catch(error => res.status(401).send(error.message))
});

module.exports = server;