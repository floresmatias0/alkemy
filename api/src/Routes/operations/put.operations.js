const server = require('express').Router();
const { Operation } = require('../../db.js');


server.put('/update/:operationId', async(req, res, next) => { 
    let { operationId } = req.params
    let { concept, mount, date, type } = req.body
    
    await Operation.findOne({
        where:{
            id: operationId
        }
    })
    .then((op) => {
        if(op !== null){
            Operation.update({
                concept,
                mount,
                date,
                type
            },{
                where: {
                    id: operationId
                }
            }).then(operation => {
                res.status(201).send("update success")
            })
        }else{
            res.status(201).send("sorry doesn't find operation")
        }
    })
    .catch(error => {
        console.log(error)
        res.status(400).send(error)
    })
});

module.exports = server;