const express = require('express');
const router = express.Router();
const Member = require('../service/memberService.js');

router.get("/createMember", (req, res)=>{
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


module.exports = router;