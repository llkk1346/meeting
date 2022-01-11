const express= require('express');
const router=express.Router();
const LocalStrategy = require('passport-local').Strategy;
const dayjs = require('dayjs');
const Event = require('../service/eventService.js');
const {meeting_room} = require('../../models');
const {reservation} = require('../../models');

router.get('/events', async (req, res, next)=>{
    // 1. 회의실 목록 불러오기.
    let meetingRoom = await Event.findMeetingRoom(req, res);
    if(req.user === undefined) {
        res.render('event/full-calender',{
            'title': '예약일자',
            dayjs: dayjs,
            'findUserId': undefined,
            'findUserUID': undefined,
            'meetingRoom': meetingRoom
        });
    } else {
        res.render('event/full-calender',{
            'title': '예약일자',
            dayjs: dayjs,
            'findUserId': req.user.user_name,
            'findUserUID': req.user.id,
            'meetingRoom': meetingRoom
        });
    }

})

//예약목록 불러오기. 캘린더 오픈시 ajax로 실행.
router.get('/search', async(req, res)=>{
    let reservationList = await Event.findReservation(req, res);
    if(reservationList===undefined){
        reservationList={};
        res.send(reservationList)
    }
    res.send(reservationList);

    
})

//회의실 삭제 api
router.delete("/delete/:id", async (req, res)=>{
    console.log(req.params.id);
    await meeting_room.destroy({where:{
        id: req.params.id
    }});
})

//예약정보 삭제 api
router.delete("/reservation/delete/:id", async (req, res)=>{
    await reservation.destroy({
        where:{
            user_name: req.params.id
        }
    })
})

//회의실 저장
router.post("/save", async (req, res)=>{
    await Event.createMeetingRoom(req, res);
})

//예약정보 저장
router.post("/reservation", async (req, res)=>{
    // 1. 예약정보 저장
    let result = await Event.saveMeeting(req, res);
    res.send(result);
})

//예약정보에 필요한정보
router.post("/reservation/:id", async (req, res)=>{
    let result = await Event.findsaveMeeting(req, res);
    res.send(result);
});

//예약정보 수정
router.put("/reservation/:id", async (req, res)=>{
    console.log("DADFSDFA");
    let result = await Event.updateReservation(req, res);
    res.send(result);
})

module.exports=router;
