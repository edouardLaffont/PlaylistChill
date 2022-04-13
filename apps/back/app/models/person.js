const connection = require('../database');
const { Model, DataTypes } = require('sequelize');

class Person extends Model {

}

Person.init({
    username: {
      type: DataTypes.TEXT
    },
  },
    {
        sequelize: connection,
        tableName: 'person'
        
    });

module.exports = Person;