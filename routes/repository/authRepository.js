const {auth} = require('../../models');

//인증번호 생성
exports.createAuth = async (req, res)=>{
    await auth.create({
        user_email: req.body.email,
        auth_num: req.body.authNumber,
        role: 'Y'
    });
}

//인증번호 멤버 업데이트
exports.authUpdate = async (req, res, find_id, userEmail)=>{
    //console.log("인증번호 멤버 업데이트 : ", findMember.member.memberUID);
    console.log(find_id);
    await auth.update({
        member_id: find_id
    }, {where: {
        user_email: userEmail
        }
    });
}