// models/healthRecord.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const HealthRecord = sequelize.define(
  "HealthRecord",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    cattleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    vaccinationDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    nextVaccinationDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    dewormingDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    nextDewormingDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    illness: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    illnessStartDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    severityLevel: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    illnessRemarks: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    checkupDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    remarks: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "healthrecords", // MySQL table name
    freezeTableName: true,
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  }
);

module.exports = HealthRecord;
