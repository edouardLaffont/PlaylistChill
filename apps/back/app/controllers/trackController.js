const Track = require("../models/track");
const fs = require("fs");
const { sequelize } = require("../models/track");

const readFile = () => {
  let readFile = fs.readFileSync("./app/PlayerUser.json");
  return JSON.parse(readFile);
};

const writeFile = (donners) => {
  let writeFile = JSON.stringify(donners);
  fs.writeFileSync("./app/PlayerUser.json", writeFile);
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
    let play = readFile();
    let list;
    if (
      getValue(Object.keys(query), "list") &&
      getValue(Object.keys(query), "user")
    ) {
      list = play[query.user];
      dis = {};
      let numberPlay = Number(query.play);
      if (nb < 0) {
        console.log("prev");
        dis.Play = list[numberPlay - 1];
        dis.table = list.length - 1;
        dis.id = list.indexOf(dis.Play);
        response.status(200).json(dis);
      } else if (nb > 0) {
        console.log("next", list.length);
        numPlayPlus = numberPlay + 1;
        if (numPlayPlus < list.length) {
          console.log("next", list.length);
          dis.Play = list[numPlayPlus];
          dis.table = list.length;
          dis.id = list.indexOf(dis.Play);
          response.status(200).json(dis);
        }
        if (numPlayPlus > list.length) {
          console.log("next trak");
          const nextTrack = await Track.findByPk(
            Number(getRandomIntInclusive(1, 10))
          );
          list.push(nextTrack);
          play[query.user] = list;
          writeFile(play);
          dis.Play = nextTrack;
          dis.table = list.length;
          dis.id = list.indexOf(dis.Play);
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

  getSuggestions: async (request, response) => {
    try {
      const [results, metadata] = await sequelize.query('SELECT * from "track" where id_kind IN ( ' +
        'SELECT "track".id_kind ' +
        'FROM "like" ' +
        'INNER JOIN "track" ON "track".id = id_track ' +
        ' WHERE id_person = 1 ' +
        ' GROUP BY id_kind' +
        ' ORDER BY count(id_kind) DESC ' +
        'LIMIT 3' +
        ' ) ORDER BY random() LIMIT 8')
        response.status(200).json(results)
    } catch (error) {
      console.trace(error);
      response.status(404).json("Couldn't find tracks");
    }
  },

  getTracksByKind: async (request, response) => {
    try {
      const [results, metadata] = await sequelize.query(`
        SELECT * from "track"
        INNER JOIN "kind" ON track.id_kind = kind.id
        WHERE kind.label = '${request.params.label}'
      `)
        response.status(200).json(results)
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
