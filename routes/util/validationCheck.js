const Event = require('../repository/eventRepository.js');



/**
 * 1. 같은회원이 같은시간대에 동시에 두개의 회의실을 잡을수 없다.
 * 2. 시작시간보다 종료시간이 더빠를때 경고. 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.reservationValidationCheck = async (req, res, dbStartDate, dbEndDate)=>{
    //전달 메시지
    let msg;
    //전달 코드
    let result = 0;
    //json 전달
    let json;

    //회의실 저장 인원 비교.
    let findMeetingCount = await Event.checkMeeting(req, res);
    if(findMeetingCount.count*1 < req.body.peoples){ //*1 붙인 이유는 형변환 문자 -> 넘버
        result = 400;
        msg = "회의실 예약인원보다 많은 인원은 들어갈수없습니다.";
        json = {code: result, msg: msg};
        return json;
    }
    //시작일이 끝나는일보다 크면 예약일정 오류. 반환 
    if(dbStartDate > dbEndDate){
        result = 400;
        msg = "예약일자를 확인하여 주세요.";
        json = {code: result, msg: msg};
        return json;
    }
    let reservationFindAll = await Event.findAll(req, res);
    //선택한 회의실 예약테이블에 존재하는지 확인
    //같은시간대에 있는지 확인.
    let count = await Event.checkReservation(req, res, dbStartDate, dbEndDate);
    
    if(count[0].id >= 1 ){
        result = 400;
        msg = "선택한 회의실이 선택한 시간에 예약이 존재합니다.";
        json = {code: result, msg: msg};
        return json;
    } else {
        await Event.createReservation(req, res, dbStartDate, dbEndDate);
        result = 200;
        msg = "등록완료.";
        json = {code: result, msg: msg};
        return json;
    }
}