const { Person, Profil } = require('../models');

const personController = {

    createPerson: async (request, response) => {
        const person = request.body;
        try {
            const personName = await Person.findOne({ where: { username: request.body.username } });
            if (personName) {
                return response.status(409).json("Nom utilisateur déjà enregistré");
            };
            const createdPerson = await Person.create(person)
            await Profil.create({ id_person: createdPerson.id })
            Person.findByPk(Number(createdPerson.id), {
                include: ['profil']
            }).then((person) => {
                response.status(201).json(person);
            })
        } catch (error) {
            console.log(error);
            response.status(500);
        }
    },

    getPerson: async (request, response) => {
        try {
            const person = await Person.findByPk(Number(request.params.id), {
                include: ['playlists', 'tracks', 'profil']
            });
            response.status(200).json(person);
        } catch (err) {
            console.trace(err);
            response.status(500);
        }
    },

    
};

module.exports = personController;