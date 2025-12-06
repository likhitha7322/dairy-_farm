// models/cattle.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Cattle = sequelize.define(
  "Cattle",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    // must match MySQL column: tagNo
    tagNo: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    // you are sending "name" from frontend
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    breed: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    dob: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },

    status: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    notes: {
      type: DataTypes.TEXT("long"),
      allowNull: true,
    },
  },
  {
    tableName: "cattles",
    freezeTableName: true,

    // 👇 IMPORTANT CHANGE
    timestamps: true,          // tell Sequelize to manage createdAt/updatedAt
    createdAt: "createdAt",    // name of column in DB
    updatedAt: "updatedAt",    // name of column in DB
  }
);

module.exports = Cattle;
