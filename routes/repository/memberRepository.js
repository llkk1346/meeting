const express = require('express');
const router = express.Router();
const {member} = require('../../models');

//회원가입하려는 이메일주소있는지 찾기
exports.findMemberId = async (req, res)=>{
    return await member.findAll(
        {where: {
            userEmail: req.body.email
            }
        });
}

//멤버저장.
exports.memberCreate = async (req, res, salt, encryptionUserPw)=>{
    // 멤버테이블에 저장 (insert)
    await member.create({
        userEmail: req.body.email,
        userPw: encryptionUserPw,
        userName: req.body.userName,
        salt: salt,
        authNum: req.body.authNumber
    });
}
