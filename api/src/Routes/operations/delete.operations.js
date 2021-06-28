const server = require('express').Router();
const { Operation } = require('../../db.js');


server.delete('/delete/:operationId', async(req, res, next) => { 
    let { operationId } = req.params
    
    Operation.findOne({
        where:{
            id: operationId
        }
    })
    .then((op) => {
        if(op !== null){
            Operation.destroy({
                where:{
                    id: operationId
                }
            })
            .then(() => res.status(202).send("operation delete"))
        }else{
            res.status(202).send("sorry doesn't find operation")
        }
    }) 
    .catch(error => res.status(400).send(error))
});

module.exports = server;