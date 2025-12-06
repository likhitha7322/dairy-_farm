// models/milkFeed.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const MilkFeed = sequelize.define(
  "MilkFeed",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      // maps to column `id`
    },

    cattleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "cattle_id",
    },

    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: "record_date",
    },

    morningYield: {
      type: DataTypes.FLOAT,
      allowNull: true,
      field: "morning_yield",
    },
    eveningYield: {
      type: DataTypes.FLOAT,
      allowNull: true,
      field: "evening_yield",
    },
    totalYield: {
      type: DataTypes.FLOAT,
      allowNull: true,
      field: "total_yield",
    },

    milkPricePerLitre: {
      type: DataTypes.FLOAT,
      allowNull: true,
      field: "cost_per_litre",
    },
    milkIncome: {
      type: DataTypes.FLOAT,
      allowNull: true,
      field: "total_income",
    },

    feedType: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "feed_type",
    },
    quantity: {
      type: DataTypes.FLOAT,
      allowNull: true,
      field: "feed_quantity",
    },
    feedTotalCost: {
      type: DataTypes.FLOAT,
      allowNull: true,
      field: "feed_total_cost",
    },

    earnings: {
      type: DataTypes.FLOAT,
      allowNull: true,
      field: "total_profit",
    },

    // virtual: cost per kg feed
    costPerUnit: {
      type: DataTypes.VIRTUAL,
      get() {
        const qty = this.getDataValue("quantity");
        const total = this.getDataValue("feedTotalCost");
        if (!qty || qty === 0 || total == null) return null;
        return total / qty;
      },
      set() {},
    },

    // virtual: running cost (not stored)
    runningCost: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.getDataValue("_runningCost") || 0;
      },
      set(value) {
        this.setDataValue("_runningCost", Number(value || 0));
      },
    },
  },
  {
    tableName: "milkfeeds",
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = MilkFeed;
