const server = require('express').Router();
const { Operation } = require('../../db.js');
const { getOperationById } = require('../../Controllers/operations/get.operations')


server.get('/', (req, res, next) => { 
    Operation.findAll()
    .then(op => {
        if(op.length > 0){
            res.status(200).json(op);
        }else{
            res.status(200).send("Sorry no operations");
        }
    }) 
    .catch(error => {
        console.log(error)
        res.status(400).send(error)
    })
});

server.get('/:idOperation', (req, res, next) => { 
    const { idOperation } = req.params
 
    getOperationById(idOperation)
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