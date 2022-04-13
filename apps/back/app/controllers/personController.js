const { Person } = require('../models');

const personController = {

    createPerson: async (request, response) => {
        const person = new Person(request.body);
        console.log(request.body)
        try {
            const personName = await Person.findOne({ where: { username: request.body.username } });
            if (personName) {
                return response.status(409).json("Nom utilisateur déjà enregistré");
            };
            await person.save();
            response.status(201).json(person);
        } catch (err) {
            console.trace(err);
            response.status(500).json("Une erreur est survenue lors de l'inscription");
        };
    },

    getPerson: async (request, response) => {
        try {
            const person = await Person.findByPk(Number(request.params.id), {
                include: ['playlists', 'tracks']
            });
            response.status(200).json(person);
        } catch (err) {
            console.trace(err);
            response.status(500);
        }
    },

};


module.exports = personController;