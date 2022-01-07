const express = require('express');
const router = express.Router();
const {role} = require('../models/');
const {isLoggedIn, isNotLoggedIn} = require('./middlewares');
/* GET home page. */
router.get('/', async function(req, res, next) {
  let rows = await findRole();
  if(rows[0]==undefined){
    await roleCreate();
  }
  res.render('index', { 'title': '로그인' });
});

function roleCreate(){
    return new Promise((resolve, reject)=>{
      try{
        role.create({
          id: '1',
          role_name: 'USER'
        });
        role.create({
          id: '2',
          role_name: 'ADMIN'
        });
      } catch(err){
        console.log(err);
        reject(err);
      }
    }) 
}

function findRole(){
  return new Promise((resolve, reject)=>{
    try {
      let rows = role.findAll({});
      resolve(rows);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  })
}

module.exports = router;


