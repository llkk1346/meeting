const passport = require('passport');
const local = require('./localStragegy');


module.exports = (passport) =>{
    passport.serializeUser(function(findUserId, done){
        console.log("findUserId S :", findUserId);
        done(null, findUserId);
    });
    passport.deserializeUser(function(findUserId, done){
        console.log("findUserId D :", findUserId);
        done(null, findUserId);
    });

    local(passport);

};
