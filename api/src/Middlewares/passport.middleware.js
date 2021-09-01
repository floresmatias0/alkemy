const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require("../db");
const bcrypt = require('bcrypt');
const JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt;

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

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret_jwt';

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.sub}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
}));

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