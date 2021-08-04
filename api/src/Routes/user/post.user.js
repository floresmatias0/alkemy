const server = require('express').Router();
const { createUser } = require('../../Controllers/user/post.user')


server.post('/create', (req, res, next) => { 
    const { name,surname,email,password,password_virtual } = req.body
    
    createUser(name,surname,email,password,password_virtual)
    .then(newUser => {
        res.status(201).json(newUser);
    }) 
    .catch(error => {
        console.log(error)
        res.status(400).send(error)
    })
});

module.exports = server;