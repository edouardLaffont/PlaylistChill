const Track = require('../models/track');
const { Sequelize } = require('sequelize');

const trackController = {

getNextTrack: async (request, response) => {
    try {
        const nextTrack = await Track.findAll({ order: Sequelize.literal('rand()')});
        response.status(200).json(nextTrack);
    } catch (error) {
        console.trace(error);
        response.status(404).json("Couldn't find tracks")
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

}

module.exports = trackController;