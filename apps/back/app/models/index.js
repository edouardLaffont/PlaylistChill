const Like = require('./like');
const Track = require('./track');

Track.hasMany(Like, {
    foreignKey: 'track_id',
    as: 'likes'
});

Like.belongsTo(Track, {
    foreignKey: 'track_id',
    as: 'track'
});

module.exports = {
    Track,
    Like
};