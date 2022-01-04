const {authNum} = require('../../models');
const express = require('express');
const router = express.Router();

//인증번호 생성
exports.createAuth = async (req, res)=>{
    await authNum.create({
        userEmail: req.body.email,
        authNum: req.body.authNumber,
        role: 'Y'
    });
}

//인증번호 멤버 업데이트
exports.authUpdate = async (findMember)=>{
    await authNum.update({
        memberUID: findMember.memberUID
    }, {where: {
        userEmail: findMember.userEmail
        }
    });
}