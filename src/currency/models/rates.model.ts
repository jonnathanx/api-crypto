const { Models, sequelize, DataTypes } = require('sequelize');
import { db } from "../../config/database"

export const Response = db.define('Response', {
  // Model attributes are defined here
  idcd: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  symbol: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  // Other model options go here
  id: {
    type: DataTypes.INTEGER
  },
  id_currency: {
    type: DataTypes.INTEGER
    // allowNull defaults to true
  },
  value: {
    type: DataTypes.DECIMAL
    // allowNull defaults to true
  },
  created_at: {
    type: DataTypes.DATETIME
    // allowNull defaults to true
  }
});

// `sequelize.define` also returns the model
console.log(Response === db.models.Response); // true