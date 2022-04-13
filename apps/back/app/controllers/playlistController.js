const { Playlist } = require('../models');

const playlistController = {

    createPlaylist: async (request, response) => {
        const playlist = request.body;
        try {
            const createdPlaylist = await Playlist.create(playlist)
            Playlist.findByPk(Number(createdPlaylist.id), {
            }).then((playlist) => {
                response.status(201).json(playlist);
            })
        } catch (error) {
            console.log(error);
            response.status(500);
        }
    },

    getPlaylist: async (request, response) => {
        try {
            const playlist = await Playlist.findByPk(Number(request.params.id), {
                include: ['person', 'tracks']
            });
            response.status(200).json(playlist);
        } catch (err) {
            console.trace(err);
            response.status(500);
        }
    },

    getPlaylistByPerson: async (request, response) => {
        try {
            const playlistByPerson = await Playlist.findAll({ where: { id_person: request.params.id_person } });
            response.status(200).json(playlistByPerson)
        } catch (error) {
            console.log(error);
            response.status(500);
        }
    },

    addTrackInPlaylist: async (request, response) => {
        const trackToAdd = request.body
        try {
            const playlist = await Playlist.findByPk(Number(request.params.id));
            await playlist.addTracks(trackToAdd.id_track, playlist.id);
            Playlist.findByPk(Number(playlist.id), {
                include: ['person', 'tracks']
            }).then((playlist) => {
                response.status(201).json(playlist);
            })
        } catch (err) {
            console.trace(err);
            response.status(500);
        }
    }

};

module.exports = playlistController;