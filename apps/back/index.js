require('dotenv').config();

const express = require('express');

const app = express();

const port = process.env.PORT || 5820;

const router = require('./app/router');

app.use('/v1', router);

app.listen(port, _ => {
   console.log(`http://localhost:${port}`);
});