const {meeting_room} = require('../../models');
const {reservation} = require('../../models');
const {Op} = require('sequelize');

//회의실 생성
exports.createMeetingRoom = async (req, res)=>{
    await meeting_room.create({
        room_name: req.body.roomName,
        count: req.body.peopleCount
    })
}

//회의실 모두찾기
exports.findMeetingRoom = async (req, res)=>{
    return await meeting_room.findAll({});
}

//예약정보 모두찾기
exports.findReservation = async (req, res)=>{
    return await reservation.findAll({});
}

//선택 회의실 찾기.
exports.checkMeeting = async (req, res)=>{
    return await meeting_room.findOne(
        {where: {
            id: req.body.meetingRoom
            }
        }
    )
}
//예약정보 조회. 동일시간대. 예약하려는지 확인
exports.checkReservation = async(req, res, dbStartDate, dbEndDate)=>{
    return await reservation.findAll({
        where: {
            user_name: req.body.userName,
            [Op.and]:{
                start_date:{
                    [Op.lte]: dbStartDate
                },
                end_date:{
                    [Op.gte]: dbEndDate
                }
            }
        }
    })
}

//예약정보 조회 동일시간대 같은회의실 다른사용자 확인
exports.checkDuplication = async(req, res, dbStartDate, dbEndDate)=>{
    return await reservation.findOne({
        where: {
            room_name: req.body.meetingRoom,
            [Op.and]:{
                start_date:{
                    [Op.lte]: dbStartDate
                },
                end_date:{
                    [Op.gte]: dbEndDate
                }
            }
        }
    })
}

//예약정보 저장.
exports.createReservation = async (req, res, dbStartDate, dbEndDate)=>{
    await reservation.create({
        user_name: req.body.userName,
        title: req.body.meetingTitle,
        content: req.body.meetingContent,
        count: req.body.peoples,
        start_date: dbStartDate,
        end_date: dbEndDate,
        room_name: req.body.meetingRoom
    })
}
