const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('role', {
    roleUID: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      primaryKey: true,
      comment: "권한UID(고유값)"

    },
    roleName: {
      type: DataTypes.STRING(10),
      allowNull: true,
      comment: "권한종류"
    }
  }, {
    sequelize,
    tableName: 'role',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "roleUID" },
        ]
      },
    ]
  });
};
