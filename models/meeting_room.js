const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes){
    return sequelize.define('meeting_room',{
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            comment: '회의실UID(고유값)'
        },
        room_name: {
            type: DataTypes.STRING(100),
            allowNull: true,
            comment: '회의실이름'
        },
        count: {
            type: DataTypes.STRING(100),
            allowNull: true,
            comment: '인원수'
        }
    },{
        sequelize,
        tableName: 'meeting_room', //테이블이름
        timestamps: false,
        indexes: [
            {
                name: 'PRIMARY',
                unique: true,
                using: "BTREE",
                fields: [
                    {name: "id"}
                ]
            },
        ]
    });
}