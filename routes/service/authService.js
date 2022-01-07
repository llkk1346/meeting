const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const crypto = require('crypto');
var appDir = path.dirname(require.main.filename);
const Auth = require('../repository/authRepository.js');

//인증번호 저장
exports.AuthNumber = async (req, res)=>{
    try {
        await Auth.createAuth(req, res);
    } catch (error) {
        console.log(error);
    }
}


//인증메일 보내기
exports.authSendMail = async (req, res)=>{    
    try {
        //해시코드 생성
        const authNum = crypto.randomBytes(3).toString('hex');
        /** 
         * DB에 발급코드 업데이트 
         * param 1 생성된 해시코드 담을 변수 
         */
        let emailTemplete;
        ejs.renderFile(appDir+'/../views/authMail.ejs', {authCode : authNum}, function(err, data){
            if(err){console.log(err)}
            emailTemplete = data;
        });

        //nodemailer Transport 생성
        const transporter = nodemailer.createTransport({
            service: 'aimmed',
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            secure: true, //true for 465, false for other ports
            auth:{ // 이메일을 보낼 계정 데이터 입력.
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_AUTH_PASS
            },
        });
        
        //옵션값 설정
        const mailOptions = await transporter.sendMail({
            
            //from: "dgko@aimmed.com", //보내는 곳의 이름과 메일주소를입력
            from: "kodg9494@gmail.com", //보내는 곳의 이름과 메일주소를입력
            to: req.body.email, //받는 곳의 메일주소 param => 회원가입창에서 넘겨받은 이메일
            subject: '회원가입을 위한 인증번호를 입력해주세요.',
            html: emailTemplete,
        });
    
        transporter.sendMail(mailOptions, function(error, info){ //위 옵션전송
            if(error){
                console.log(error);
            }
            console.log("Finish sending email: "+ info.response);
            //res.send(authNum);
            transporter.close();
        });
        return authNum;
    } catch (error) {
        console.log(error);
    }

}