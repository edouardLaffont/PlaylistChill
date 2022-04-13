const connection = require('../database');
const { Model, DataTypes } = require('sequelize');

class Playlist extends Model {

}

Playlist.init({
    name: {
      type: DataTypes.TEXT
    },
  },
    {
        sequelize: connection,
        tableName: 'playlist'
        
    });

module.exports = Playlist;