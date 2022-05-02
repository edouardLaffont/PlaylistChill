const connection = require('../database');
const { Model, DataTypes } = require('sequelize');

class Kind extends Model {

}

Kind.init({
    label: {
      type: DataTypes.TEXT
    },
  },
    {
        sequelize: connection,
        tableName: 'kind'
    });

module.exports = Kind;