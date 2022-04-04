const Track = require("../models/track");
const { Sequelize } = require("sequelize");
const fs = require("fs");

const Lirefichier = () => {
  let Lirefichier = fs.readFileSync("./app/PlayerUser.json");
  return JSON.parse(Lirefichier);
};

const Ecritfichier = (donners) => {
  let Ecritfichier = JSON.stringify(donners);
  fs.writeFileSync("./app/PlayerUser.json", Ecritfichier);
};
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getValue = (Array, value) => {
  return new Promise((resolve, reject) => {
    console.log(Array, Array.length);
    for (let index = 0; index < Array.length; index++) {
      const element = Array[index];
      if (element == value) {
        resolve(true);
      } else {
        break;
      }
    }
  });
};

const getPlayer = async (nb, query, response) => {
  try {
    let play = Lirefichier();
    let liste;
    if (
      getValue(Object.keys(query), "list") &&
      getValue(Object.keys(query), "user")
    ) {
      liste = play[query.user];
      dis = {};
      let numberPlay = Number(query.play);
      if (nb < 0) {
        console.log("prev");
        dis.Play = liste[numberPlay - 1];
        dis.table = liste.length - 1;
        dis.id = liste.indexOf(dis.Play);
        response.status(200).json(dis);
      } else if (nb > 0) {
        console.log("next", liste.length);
        numPlayPlus = numberPlay + 1;
        if (numPlayPlus < liste.length) {
          console.log("next", liste.length);
          dis.Play = liste[numPlayPlus];
          dis.table = liste.length;
          dis.id = liste.indexOf(dis.Play);
          response.status(200).json(dis);
        }
        if (numPlayPlus > liste.length) {
          console.log("next trak");
          const nextTrack = await Track.findByPk(
            Number(getRandomIntInclusive(1, 10))
          );
          liste.push(nextTrack);
          play[query.user] = liste;
          Ecritfichier(play);
          dis.Play = nextTrack;
          dis.table = liste.length;
          dis.id = liste.indexOf(dis.Play);
          response.status(200).json(dis);
        }
      }
    } else {
      response.status(201).json("azer");
    }
  } catch (error) {
    console.trace(error);
  }
};

const trackController = {
  getAllTracks: async (request, response) => {
    try {
      const tracks = await Track.findAll();
      response.status(200).json(tracks);
    } catch (err) {
      console.trace(err);
      response.status(500);
    }
  },

  getOneTrack: async (request, response) => {
    try {
      const track = await Track.findByPk(Number(request.params.id));
      response.status(200).json(track);
    } catch (err) {
      console.trace(err);
      response.status(500);
    }
  },

  getNextTrack: async (request, response) => {
    try {
      getPlayer(1, request.query, response);
    } catch (error) {
      console.trace(error);
      response.status(404).json("Couldn't find tracks");
    }
  },
  getPrevTrack: async (request, response) => {
    try {
      getPlayer(-1, request.query, response);
    } catch (error) {
      console.trace(error);
      response.status(404).json("Couldn't find tracks");
    }
  },
};
module.exports = trackController;
