// models/breedingRecord.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const BreedingRecord = sequelize.define(
  "BreedingRecord",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    cattleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "cattle_id",
    },
    serviceDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: "service_date",
    },
    method: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bullName: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "bull_name",
    },
    pregnancyStatus: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "pregnancy_status",
    },
    expectedCalvingDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: "expected_calving_date",
    },
    calvingDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: "calving_date",
    },
    remarks: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "breedingrecords",
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = BreedingRecord;
