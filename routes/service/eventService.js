const Event = require('../repository/eventRepository.js');
const Member = require('../repository/memberRepository.js');
const utilDayjs = require('../util/dayjs');
const utilVC = require('../util/validationCheck');
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



//수정목록으로 넘어갈 예약정보 찾기
exports.findsaveMeeting = async (req, res)=>{
    try {
        return await Event.findsaveMeeting(req, res);
    } catch (error) {
        console.log(error);
    }
}

//예약정보 수정
exports.updateReservation = async (req, res) =>{
    try {
        //전달 메시지
        let msg;
        //전달 코드
        let result = 0;
        //json 전달
        let json;
        let dbStartDate = utilDayjs.startTime(req, res);
        let dbEndDate = utilDayjs.endTime(req, res);
        let checkfind = await utilVC.reservationValidationCheck(req, res, dbStartDate, dbEndDate);
        console.log("checkfind : ",checkfind);
        if(checkfind.code==200){
            result =200;
            msg = "수정에 하였습니다.";
            await Event.updateReservation(req, res, dbStartDate, dbEndDate);
            json = {code: result, msg: msg};
        } else {
            result = checkfind.code
            msg = checkfind.msg
            json = {code: result, msg: msg};
        }
        return json
    } catch (error) {
        console.log(error);
    }
}


//예약정보 저장
/**
 *  
 * @returns result, msg, json방식
 */
exports.saveMeeting = async (req, res) =>{
    try {
        //최종 날짜 조합
        let dbStartDate = utilDayjs.startTime(req, res);
        let dbEndDate = utilDayjs.endTime(req, res);
        let checkfind = await utilVC.reservationValidationCheck(req, res, dbStartDate, dbEndDate);
        return checkfind;
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