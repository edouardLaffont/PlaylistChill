const { Router } = require('express');
const likeController = require('./controllers/likeController');
const trackController = require('./controllers/trackController');

const router = Router();

// Track
router.get('/next', trackController.getNextTrack);
router.get('/tracks/:id', trackController.getOneTrack);

module.exports = router;