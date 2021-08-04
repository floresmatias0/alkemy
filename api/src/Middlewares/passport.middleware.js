const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require("../db");
const bcrypt = require('bcrypt');


passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
  function(email, password, done) {
    User.findOne({
      where:{
        email: email
      } 
    })
    .then((user) => {
      if(user){
        const passwordIsRight = bcrypt.compareSync(password, user.password);

        if(passwordIsRight){
            return done(null, user);
        }else{
          let errPassword = "Password Invalid"
            return done(null,false,errPassword);
        }

    }else {
      let errEmail = "Email Invalid"
        return done(null, false, errEmail);
    }
  })
  .catch(err => {
    done(err)
  });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findByPk(id)
    .then((user)=>{
      done(null, user);
    })
    .catch(err => {
      return done(err)
    });
});

module.exports = passport;