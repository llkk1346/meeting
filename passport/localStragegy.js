const LocalStrategy = require('passport-local').Strategy;
const {member} = require('../models');
const crypto = require('crypto');


module.exports = (passport) =>{
    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'userPw'
    }, async (email, userPw, done)=>{
        try {
            console.log("Check");
            //저장되어있는 유저 비교.
            const findUserId = await member.findOne({where: {userEmail: email}});
            if(findUserId){ //로그인 요청한 email 이 있으면
                const DB_PASSWORD = findUserId.userPw //DB에 저장된 패스워드 가져온다.
                const DB_SALT = findUserId.salt; //DB에 저장된 salt값 가져온다.
                const DB_RESULT = DB_PASSWORD + DB_SALT;
    
                //로그인시 입력한 유저 패스워드와 데이터베이스에서 가져온 솔트값을 이용해 다시한번 암호화 진행.
                const result = crypto.pbkdf2Sync(userPw, DB_SALT, 102934, 64, 'sha512').toString('base64');//암호화 매개변수 5개 비밀번호, salt, 반복횟수, 비밀번호 길이, 해시 알고리즘
                //다시한번 진행된 암호화를 데이터베이스에 저장된 암호화 비교
                if((result+DB_SALT) === DB_RESULT) {
                    return done(null, findUserId, {message: "Login Successfully"});
                } 
            } else {
                return done(null, false, {message: "login false"});
            }
        } catch (error) {
            console.log(error);
            return done(error);
        }
    }
    ));
}
