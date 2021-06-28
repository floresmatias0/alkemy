const server = require('express').Router();
const { Operation } = require('../../db.js');


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

module.exports = server;