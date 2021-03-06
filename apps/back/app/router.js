const { Router } = require("express");
const likeController = require("./controllers/likeController");
const personController = require("./controllers/personController");
const playlistController = require("./controllers/playlistController");
const trackController = require("./controllers/trackController");

const router = Router();

// Track
router.get("/tracks", trackController.getAllTracks);
router.get("/tracks/:id", trackController.getOneTrack);
router.get("/tracks/kind/:label", trackController.getTracksByKind);
router.get("/suggestions/:id_person", trackController.getSuggestions);
router.get("/prev", trackController.getPrevTrack);

// Person
router.post("/person", personController.createPerson);
router.post("/connect", personController.connectPerson);
router.get("/person/:id", personController.getPerson);

// Playlist 
router.post("/playlist", playlistController.createPlaylist);
router.post("/playlist/:id/add", playlistController.addTrackInPlaylist);
router.get("/playlist/person/:id_person", playlistController.getPlaylistByPerson);
router.get("/playlist/:id", playlistController.getPlaylist);

// Like
router.post("/like/person/:id/add", likeController.addLike);

module.exports = router;
