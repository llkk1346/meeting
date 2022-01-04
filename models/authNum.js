const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('authNum', {
    authUID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    userEmail: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    authNum: {
      type: DataTypes.STRING(70),
      allowNull: false
    },
    role: {
      type: DataTypes.CHAR(1),
      allowNull: false
    },
    regData: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    memberUID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'member',
        key: 'memberUID'
      }
    }
  }, {
    sequelize,
    tableName: 'authNum',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "authUID" },
        ]
      },
      {
        name: "memberUID",
        using: "BTREE",
        fields: [
          { name: "memberUID" },
        ]
      },
    ]
  });
};
