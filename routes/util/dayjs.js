const dayjs = require('dayjs');

exports.startTime = (req, res)=>{
    
    //시작일 시간 분
    let startDate = req.body.meetingDateStartYMD;
    let startTimeY = req.body.meetingStartTimeY;
    let startTimeM = req.body.meetingStartTimeM;
    let startTimeS = "00";
    
    if(startTimeY.length === 1){
        startTimeY = "0"+ startTimeY;
    }
    if(startTimeM.length ===1 ){
        startTimeM = "0"+startTimeM;
    }

    let finalDate = startDate +" "+startTimeY+":"+startTimeM+":"+startTimeS;
    //날짜 객체 생성.
    let meetingDate = dayjs(new Date()).format(finalDate);
    //let dbStartDate = meetingDate.format();
    //console.log("meetingDate : ",meetingDate);
    return meetingDate;
}

exports.endTime = (req, res)=>{
    //끝일 시간 분
    let endDate = req.body.meetingDateEndYMD;
    let endTimeY = req.body.meetingEndTimeY;
    let endTimeM = req.body.meetingEndTimeM;
    let endTimeS = "00";

    
    if(endTimeY.length === 1){
        endTimeY = "0"+ endTimeY;
    }
    if(endTimeM.length ===1 ){
        endTimeM = "0"+endTimeM;
    }
    let finalDate = endDate +" "+endTimeY+":"+endTimeM+":"+endTimeS;

    //날짜 객체 생성.
    let meetingDate = dayjs(new Date()).format(finalDate);

    //let dbEndDate = meetingDate.format(finalDate);
    //console.log("dbEndDate", dbEndDate);
    return meetingDate;
}

exports.rewind = (req, res)=>{
    let startMeetingDate = dayjs(new Date()).format(req.body.dbStartDate);
    let endMeetingDate = dayjs('YYYY-MM-DD HH:mm:ss').format(req.body.dbEndDate);

    let json = {"dbStartDate" : startMeetingDate, "dbEndDate" : endMeetingDate};
    return json;
}