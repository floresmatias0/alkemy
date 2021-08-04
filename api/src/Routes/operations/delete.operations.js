const server = require('express').Router();
const { deleteOperationById } = require('../../Controllers/operations/delete.operations');


server.delete('/delete/:idOperation', async(req, res, next) => { 
    let { idOperation } = req.params
    
    deleteOperationById(idOperation)
    .then(() => res.status(202).send("operation delete successfully")) 
    .catch(error => res.status(402).send(error.message))
});

module.exports = server;