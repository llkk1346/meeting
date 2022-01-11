const {meeting_room, Sequelize} = require('../../models');
const {reservation} = require('../../models');
const {Op} = require('sequelize');
const sequelize = require('sequelize');

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
    return await reservation.findAll({
        attributes:['id','user_name','title','content','count',
    [Sequelize.fn('date_format',Sequelize.col('start_date'),'%Y-%m-%d %H:%i:%s'),'start_date'],
    [Sequelize.fn('date_format',Sequelize.col('end_date'),'%Y-%m-%d %H:%i:%s'),'end_date'],
    'room_name'
]
    });
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
        attributes: [
            [sequelize.fn('COUNT', sequelize.col('id')), 'id']
        ],
        where: {
            room_name: req.body.meetingRoom,
            [Op.and]:{
                start_date:{
                    [Op.lt]: dbEndDate
                },
                end_date:{
                    [Op.gt]: dbStartDate
                }
            }
        }
    });
}

//예약정보 모두 가져오기
exports.findAll = async (req, res)=>{
    return await reservation.findAll({});
}

//선택한 예약정보 조회.
exports.findsaveMeeting = async(req, res)=>{
    return await reservation.findOne({
        attributes:['id','user_name','title','content','count',
        [Sequelize.fn('date_format',Sequelize.col('start_date'),'%Y-%m-%d %H:%i:%s'),'start_date'],
        [Sequelize.fn('date_format',Sequelize.col('end_date'),'%Y-%m-%d %H:%i:%s'),'end_date'],
        'room_name'
        ]
        ,where: {
            user_name: req.params.id,
            [Op.and]:{
                start_date:{
                    [Op.lte]: req.body.dbStartDate
                },
                end_date:{
                    [Op.gte]: req.body.dbEndDate
                }
            }
        }
    })
}

//예약정보 수정.
exports.updateReservation = async(req, res, dbStartDate, dbEndDate)=>{
    await reservation.update({
        title: req.body.meetingTitle,
        content: req.body.meetingContent,
        count: req.body.peoples,
        start_date: dbStartDate,
        end_date: dbEndDate,
        room_name: req.body.meetingRoom
        },{where:{
            id: req.params.id,

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
