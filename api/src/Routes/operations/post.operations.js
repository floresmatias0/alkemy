const server = require('express').Router();
const { createOperation } = require('../../Controllers/operations/post.operations')


server.post('/create', async(req, res, next) => { 
    let { concept, mount, type } = req.body
    
    createOperation(concept,mount,type)
    .then(result => {
        res.status(200).json(result)
    })
    .catch(error => {
        res.status(400).send(error.message)
    })
});

module.exports = server;