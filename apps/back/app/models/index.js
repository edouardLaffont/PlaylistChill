const Track = require('./track');
const Person = require('./person');
const Playlist = require('./playlist');
const Profil = require('./profil');
const Kind = require('./kind');

Track.belongsToMany(Person, {
    foreignKey: 'id_track',
    otherKey: 'id_person',
    through: 'like',
    as: 'persons',
    timestamps: false,
    hooks: true
});

Person.belongsToMany(Track, {
    foreignKey: 'id_person',
    otherKey: 'id_track',
    through: 'like',
    as: 'tracks',
    timestamps: false,
    hooks: true
});

Person.hasOne(Profil, {
    foreignKey: 'id_person',
    as: 'profil'
});

Profil.belongsTo(Person, {
    foreignKey: 'id_person',
    as: 'person'
});

Track.hasOne(Kind, {
    foreignKey: 'id_track',
    as: 'kind'
});

Kind.belongsTo(Track, {
    foreignKey: 'id_track',
    as: 'track'
});

Person.hasMany(Playlist, {
    foreignKey: 'id_person',
    as: 'playlists'
});

Playlist.belongsTo(Person, {
    foreignKey: 'id_person',
    as: 'person'
});

Playlist.belongsToMany(Track, {
    foreignKey: 'id_playlist',
    otherKey: 'id_track',
    through: 'associate_playlist_track',
    as: 'tracks',
    timestamps: false,
    hooks: true
});

Track.belongsToMany(Playlist, {
    foreignKey: 'id_track',
    otherKey: 'id_playlist',
    through: 'associate_playlist_track',
    as: 'playlists',
    timestamps: false,
    hooks: true
});

module.exports = {
    Track,
    Playlist,
    Person,
    Profil,
    Kind
};