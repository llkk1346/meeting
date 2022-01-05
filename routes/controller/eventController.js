const express= require('express');
const router=express.Router();
const LocalStrategy = require('passport-local').Strategy;
const dayjs = require('dayjs');
router.get('/events', async (req, res, next)=>{
    console.log("HELL");
    res.render('event/full-calender',{
        'title': '예약일자',
        dayjs: dayjs,
        'findUserId': req.user.userName
    });
})

module.exports=router;
