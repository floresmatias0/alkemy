const server = require('express').Router();
const { Operation } = require('../../db.js');


server.post('/create', async(req, res, next) => { 
    let { concept, mount, date, type } = req.body
    console.log(concept)
    await Operation.create({
        concept,
        mount,
        date,
        type
    })
    .then(result => {
        res.status(200).json(result)
    })
    .catch(error => {
        res.status(400).send(error.message)
    })
});

module.exports = server;