const Event = require('../repository/eventRepository.js');
const Member = require('../repository/memberRepository.js');
const dayjs = require('dayjs');

exports.findMeetingRoom = async (req, res)=>{
    try {
        return await Event.findMeetingRoom(req, res);   
    } catch (error) {
        console.log(error);
    }
}

exports.findReservation = async (req, res)=>{
    try {
        return await Event.findReservation(req, res);
    } catch (error) {
        console.log(error);
    }
}

exports.saveMeeting = async (req, res) =>{
    try {
        //전달 메시지
        let msg;
        //전달 코드
        let result = 0;
        //json 전달
        let json;
        //날짜 객체 생성.
        let meetingDate = dayjs();
        //시작일 시간 분
        let startDate = req.body.meetingDateStartYMD;
        let startTimeY = req.body.meetingStartTimeY;
        let startTimeM = req.body.meetingStartTimeM;
        //끝일 시간 분
        let endDate = req.body.meetingDateEndYMD;
        let endTimeY = req.body.meetingEndTimeY;
        let endTimeM = req.body.meetingEndTimeM;
        
        //최종 날짜 조합
        let dbStartDate = meetingDate.format(startDate+" "+startTimeY+":"+startTimeM);
        let dbEndDate = meetingDate.format(endDate+" "+endTimeY+":"+endTimeM);

        //회의실 저장 인원 비교.
        let findMeetingCount = await Event.checkMeeting(req, res);
        //회원정보 가져오기
        let checkMember = await Member.checkMember(req, res);
        //예약테이블 정보 가져오기
        let checkReservation = await Event.checkReservation(req, res, dbStartDate, dbEndDate);
        console.log("checkReservation : ",checkReservation);
        //같은 시간대 다른사용자가 같은 회의실 잡으려할떄 확인
        let checkDuplication = await Event.checkDuplication(req, res, dbStartDate, dbEndDate);
        console.log("checkDuplication : ",checkDuplication);
        if((findMeetingCount.count*1) < req.body.peoples){ //*1 붙인이유는 문자 -> 넘버로 형변환.
            result = 400;
            msg = "회의실 예약인원보다 많은 인원은 들어갈수없습니다.";
            json = {code: result, msg: msg};
            return json;
        } //시작일이 끝나는일보다 크면 예약일정 오류. 반환 
        else if(dbStartDate > dbEndDate){
            result = 400;
            msg = "예약일자를 확인하여 주세요.";
            json = {code: result, msg: msg};
            return json;
        } //같은시간대에 같은사용자가 두개의 회의실을 잡을수 없다. 
        //1. DB에 사용자 정보가 있는지 확인.  
        //예약정보가 있으면 안된다 조회조건 (1. 사용자, 2.회의실번호, 3.시작일 4.끝나는일) 중복등록
        //위 정보가 조회되면 중복등록이므로 쳐낸다.
        else if(checkReservation[0]!=undefined){ 
            result = 400;
            msg = "같은시간대에 등록된 결과가 있습니다 취소후 예약해주세요.";
            json = {code: result, msg: msg};
            return json;
        } 
        //1. DB에 등록하려는 회의실을 사용중인 사람이 있는지 확인.
        //조회조건 (1. 사용하려는 회의실을 누가 사용중인지. 같은 시간대 인지 확인.)
        else if(checkDuplication!=undefined){
            result = 400;
            msg = "먼저 예약한 회원이 있습니다.";
            json = {code: result, msg: msg};
            return json;
        }
        else {
            console.log("C");
            await Event.createReservation(req, res, dbStartDate, dbEndDate);
            result = 200;
            msg = "등록완료.";
            json = {code: result, msg: msg};
            return json;
        }
    } catch (error) {
        console.log(error);
    }
}

exports.createMeetingRoom = async (req, res)=>{
    try {
        await Event.createMeetingRoom(req, res);
    } catch (error) {
        console.log(error);
    }
}