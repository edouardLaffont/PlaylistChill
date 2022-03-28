const { Router } = require('express');
const likeController = require('./controllers/likeController');
const trackController = require('./controllers/trackController');

const router = Router();

// Track
router.get('/tracks', trackController.getAllTracks);
router.get('/tracks/:id', trackController.getOneTrack);
router.get('/next', trackController.getNextTrack);


module.exports = router;