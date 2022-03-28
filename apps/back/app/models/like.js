
const connection = require('../database');
const { Model, DataTypes } = require('sequelize');

class Like extends Model {

}

Like.init({
    user_name: {
      type: DataTypes.TEXT
    },
    track_id: {
      type: DataTypes.NUMBER
    },
  },
    {
        sequelize: connection,
        tableName: 'like'
        
    });

module.exports = Like;