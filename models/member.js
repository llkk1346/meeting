const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('member', {
        memberUID: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            comment: '유저UID(고유값)'
        },
        userEmail: {
            type: DataTypes.STRING(60),
            allowNull: true,
            comment: '유저아이디'
        },
        userPw: {
            type: DataTypes.STRING(200),
            allowNull: true,
            comment: '유저비밀번호'
        },
        userName: {
            type: DataTypes.STRING(60),
            allowNull: true,
            comment: '유저이름'
        },
        salt: {
            type: DataTypes.STRING(200),
            allowNull: true,
            comment: '암호화'
        },
        role: {
            type: DataTypes.CHAR(1),
            allowNull: true,
            defaultValue: "1",
            //모델 간 관계 설정
            references:{
                model: 'role', //db명
                key: 'roleUID' //참조키
            },
            comment: '권한 role Table의 FK'
            
        },
        userStatus: {
            type: DataTypes.CHAR(1),
            allowNull: true,
            defaultValue: "0",
            comment: '회원상태 (0=회원, 1=탈퇴, 2=휴먼)'
        },
        authNum: {
            type: DataTypes.STRING(200),
            allowNull: true,
            comment: '인증번호'
        },
        regData: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
            comment: '가입날짜'
        }
    },{
        sequelize,
        tableName: 'member', //테이블이름
        timestamps: false, // 이 설정 default가 true 인데 따로 설정하지않으면 테이블생성시 createAt updateAt 라는 컬럼 생성된다.
        //freezeTableName: true //자동 복수화 중지 tableName을 직접제공하면 따로설정안해도된다.
        //인덱스 설정.
        indexes: [  
            {
                name: "PRIMARY",
                unique: true,
                using: "BTREE",
                fields: [
                    {name: "memberUID"},
                ]
            },
            {
                name: "role",
                using: "BTREE",
                fields: [
                  { name: "role" },
                ]
              },
        ]
    });
};