const { Person } = require('../models');

const likeController = {

    addLike: async (request, response) => {
        const trackToLike = request.body
        try {
            const person = await Person.findByPk(Number(request.params.id));
            await person.addTracks(trackToLike.id_track, person.id);
            Person.findByPk(Number(person.id), {
                include: ['tracks']
            }).then((like) => {
                response.status(201).json(like);
            })
        } catch (err) {
            console.trace(err);
            response.status(500);
        }
    },
}

module.exports = likeController;