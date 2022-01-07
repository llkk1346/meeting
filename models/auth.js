const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('auth', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: '인증번호UID(고유값)'
    },
    user_email: {
      type: DataTypes.STRING(60),
      allowNull: false,
      comment: '회원이메일'
    },
    auth_num: {
      type: DataTypes.STRING(70),
      allowNull: false,
      comment: '인증번호'

    },
    role: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      comment: '검증'
    },
    reg_data: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: '인증번호발급시간'
    },
    member_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'k_member',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'auth',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      }
    ]
  });
};
