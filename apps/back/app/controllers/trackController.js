const Track = require('../models/track');
const { Sequelize } = require('sequelize');

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
        function getRandomIntInclusive(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        try {
            const nextTrack = await Track.findByPk(Number(getRandomIntInclusive(1, 10)));
            response.status(200).json(nextTrack);
        } catch (error) {
            console.trace(error);
            response.status(404).json("Couldn't find tracks")
        }
    },

}

module.exports = trackController;