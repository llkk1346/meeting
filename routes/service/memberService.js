const Member = require('../repository/memberRepository.js');
const Auth = require('../repository/authRepository.js');
const crypto = require('crypto');
exports.signUp = async (req, res)=>{
    try {
        let result = 0; //유저 생성 실패 or 성공 시 반환할값
        let msg = "가입완료";
        //가입요청한 아이디를 찾는다.
        let rows = await Member.findMemberId(req, res);
        
        //조회된 결과가 없으면
        if(rows[0] == undefined){
            const salt = crypto.randomBytes(64).toString('base64'); // 비밀번호 암호화에 쓰일 바이트 단위의 임의의 문자열 생성
            //암호화 매개변수 5개 비밀번호, salt, 반복횟수, 비밀번호 길이, 해시 알고리즘 반복횟수는 길수록 보안성이 높다.
            //암호화된 비밀번호 변수
            const encryptionUserPw = crypto.pbkdf2Sync(req.body.userPw, salt, 102934, 64, 'sha512').toString('base64'); 

            await Member.memberCreate(req, res, salt, encryptionUserPw); //회원가입.
            
            //가입한 계정찾기
            let findMember = await Member.findMemberId(req, res);
            //인증번호 테이블에 FK 업데이트
            console.log("AAAA : ",findMember[0].id);
            await Auth.authUpdate(req, res, findMember[0].id, findMember[0].user_email);
        } else {
             result =100; //조회된 회원이있으면.
        }
        if(result === 100){
            msg = "이미 존재하는 ID 입니다.";
        }
        let json = {code: result, msg: msg};
        return json;
    } catch (error) {
        console.log("Member Create error Message : ",  error);
    }
}
