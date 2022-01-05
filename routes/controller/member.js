const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Member = require('../service/memberService.js');
const {isLoggedIn, isNotLoggedIn} = require('../middlewares');


router.get("/createMember", isLoggedIn, (req, res)=>{
    res.render("member/createMember");
})

/**
 * result로 넘겨받는 값
 * code: =>성공 실패여부 성공= 0 실패 =100
 * msg: 가입성공 중복여부
 */
router.post("/createMember", async (req, res)=>{
    let result = await Member.signUp(req, res);
    res.send(result);
})

router.post("/login" ,isNotLoggedIn,async (req, res, next)=>{
        passport.authenticate('local-login',(passportError, findUserId, info)=>{
            //인증이 실패했거나 유저 데이터가 없다면 에러 발생
            if(passportError){
                res.status(400).json({message: info.message});
                return next(passportError);
            }
            if(!findUserId){
                req.flash("loginError", info.message);
                res.redirect('/');
            }
            //findUserId데이터를 통해 로그인 진행
            return req.login(findUserId, (loginError)=>{
                if(loginError){
                    console.error(loginError);
                    return next(loginError);
                }
                console.log("findUserId :11 ", findUserId);
                return res.redirect('/event/events');
            });
        })(req, res, next);
});


module.exports = router;