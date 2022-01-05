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
  res.render('index', { title: 'Express' });
});

function roleCreate(){
    return new Promise((resolve, reject)=>{
      try{
        role.create({
          roleUID: '1',
          roleName: 'USER'
        });
        role.create({
          roleUID: '2',
          roleName: 'ADMIN'
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


