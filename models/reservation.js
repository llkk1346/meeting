const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes){
    return sequelize.define('reservation',{
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            comment: '예약UID(고유값)'
        },
        user_name: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'k_member',
                key: 'id'
            },
            comment: '예약자명'
        },
        title: {
            type: DataTypes.STRING(100),
            allowNull: true,
            comment: '예약제목'
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: true,
            comment: '예약내용'
        },
        count: {
            type: DataTypes.STRING(100),
            allowNull: true,
            comment: '인원수'
        },
        start_date: {
            type: DataTypes.DATE,
            allowNull: true,
            comment: '예약시작일자'
        },
        end_date: {
            type: DataTypes.DATE,
            allowNull: true,
            comment: '예약끝일자'
        },
        room_name: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: '회의실이름'
        }
    },{
        sequelize,
        tableName: 'reservation', //테이블이름
        timestamps: false,
        indexes: [
            {
                name: 'PRIMARY',
                unique: true,
                using: "BTREE",
                fields: [
                    {name: "id"}
                ]
            }                        
        ]
    });
}