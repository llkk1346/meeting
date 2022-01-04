const LocalStrategy = require('passport-local').Strategy;
const {member} = require('../models');
const crypto = require('crypto');
const flash = require('connect-flash'); //사용자한테 메세지를 전달하는 모듈
module.exports = (passport) =>{
    passport.serializeUser(function(user, done){
        done(null, user);
    });
    passport.deserializeUser(function(user, done){
        done(null, user);
    });



    passport.use('local-login',new LocalStrategy({
        usernameField: 'userId',
        passwordField: 'userPw',
    }, async (userId, userPw, done)=>{
        try{
            const exMember = await member.findOne({where:{userId: userId}}); //유저Id로 로그인 접속한 유저의 정보를 가져온다.
            if(exMember){ //로그인 시도 정보가 있으면. true
                let db_userPw = exMember.userPw; // DB조회에 userPw를 가져온다.
                let db_salt = exMember.salt; // DB조회에 salt값을 가져온다.
                let db_result = db_userPw + db_salt;
                //로그인시 입력한 유저 패스워드와 데이터베이스에서 가져온 솔트값을 이용해 다시한번 암호화 진행.
                const result = crypto.pbkdf2Sync(userPw, db_salt, 102934, 64, 'sha512').toString('base64');//암호화 매개변수 5개 비밀번호, salt, 반복횟수, 비밀번호 길이, 해시 알고리즘
                //다시한번 진행된 암호화를 데이터베이스에 저장된 암호화 비교
                if((result+db_salt) === db_result) {
                    return done(null, {
                        'userId': userId,
                        'role': exMember.role // 권한 1 = 유저
                    });
                } 
            } else {
                console.log('fail 비밀번호가 일치하지 않습니다.');
                return done(null, false, {message: "사용자 계정이 일치하지않습니다."});
            }
        } catch(err){
            console.error(err);
        }
    }));
}