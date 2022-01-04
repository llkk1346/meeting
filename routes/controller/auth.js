const express = require('express');
const router = express.Router();
const Auth = require('../service/authService.js');

//post 요청이 오면
router.post("/mail", async (req, res)=>{
    //service단에서 인증 메일을 보내준다.
    let result = await Auth.authSendMail(req,res); //서버에서 생성한 인증번호 넘어온다.
    res.send(result);
});

router.post("/mail/auth", async (req, res)=>{
    try {
        let result = await Auth.AuthNumber(req, res);
        res.send(result);
    } catch (error) {
        console.log(error);
    }
})

module.exports=router;