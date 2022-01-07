const express = require('express');
const router = express.Router();
const {k_member} = require('../../models');

//회원가입하려는 이메일주소있는지 찾기
exports.findMemberId = async (req, res)=>{
    return await k_member.findAll(
        {where: {
            user_email: req.body.email
            }
        });
}

//회원찾기
exports.checkMember = async (req, res)=>{
    return await k_member.findOne({
        where: {
            id: req.body.userName
        }
    })
}



//멤버저장.
exports.memberCreate = async (req, res, salt, encryptionUserPw)=>{
    // 멤버테이블에 저장 (insert)
    await k_member.create({
        user_email: req.body.email,
        user_pw: encryptionUserPw,
        user_name: req.body.userName,
        salt: salt,
        auth_num: req.body.authNumber
    });
}
