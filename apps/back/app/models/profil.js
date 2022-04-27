const connection = require('../database');
const { Model, DataTypes } = require('sequelize');

class Profil extends Model {

}

Profil.init({
    classical: {
      type: DataTypes.NUMBER
    },
    country: {
      type: DataTypes.NUMBER
    },
    electronicdancemusic: {
      type: DataTypes.NUMBER
    },
    hiphop: {
      type: DataTypes.NUMBER
    },
    indierock: {
      type: DataTypes.NUMBER
    },
    jazz: {
      type: DataTypes.NUMBER
    },
    kpop: {
      type: DataTypes.NUMBER
    },
    metal: {
      type: DataTypes.NUMBER
    },
    oldies: {
      type: DataTypes.NUMBER
    },
    pop: {
      type: DataTypes.NUMBER
    },
    rap: {
      type: DataTypes.NUMBER
    },
    rhythmblues: {
      type: DataTypes.NUMBER
    },
    rock: {
      type: DataTypes.NUMBER
    },
    techno: {
      type: DataTypes.NUMBER
    },
  },
    {
        sequelize: connection,
        tableName: 'profil'
        
    });

module.exports = Profil;