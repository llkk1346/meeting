'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
//Sync
//모델 동기화 방법 1.
// ex member.sync({force: true}) //force: true는 실무에서 쓰면안된다. 

//모델 동기화 방법2.
//sequelize.sync({}) => 설정한 모든 모델을 한 번에 동기화.
// force: false -> 있으면 만들지않는다. true ->무조건 다시만든다.
sequelize.sync({force: false}) 
  .then(()=>{
    console.log("데이터베이스 연결 성공");
  })
  .catch((err)=>{
    console.log(err);
  });

//
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
