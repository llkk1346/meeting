const passport = require('passport');
const passportLocal = require('passport-local');
require('../passport/localStragegy')(passport);

exports.isLoggedIn =(req, res, next) =>{
    if(req.isAuthenticated()){ //로그인 중이면 isAuthenticated가 true 아니면 false
        next();
    } else {
        res.status(403).send('로그인 필요'); //403 : 클라이언트가 콘텐츠에 접근할 권리를 가지고 있지 않다. 서버의 거절응답. 401과 다른점은 서버가 클라이언트를 알고있다.
    }
};

exports.isNotLoggedIn = (req, res, next)=>{
    if(!req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/');
    }
};
