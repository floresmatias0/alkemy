const server = require('express').Router();
const { createUser } = require('../../Controllers/user/post.user');
const passport = require('../../Middlewares/passport.middleware');


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

server.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
  
      if(info === "Password Invalid"){
        return res.status(402).send("Password Invalid try again")
      }
      if(info === "Email Invalid"){
        return res.status(402).send("Email Invalid try again")
      }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
          let userLimit = {
            id: user.id,
            name: user.name,
            surname: user.surname,
            email: user.email,
            password: user.password
          }
        return res.status(201).json(userLimit);
      });
    })(req, res, next)
  });

module.exports = server;