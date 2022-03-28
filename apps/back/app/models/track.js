const connection = require('../database');
const { Model, DataTypes } = require('sequelize');

class Track extends Model {

}

Track.init({
    title: {
      type: DataTypes.TEXT
    },
    artist: {
      type: DataTypes.TEXT
    },
   
    link: {
      type: DataTypes.TEXT
    },
  },
    {
        sequelize: connection,
        tableName: 'track'
        
    });

module.exports = Track;