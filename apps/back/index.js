require('dotenv').config();

const express = require('express');

const app = express();

const port = process.env.PORT || 5820;

const router = require('./app/router');

app.use(function (req, res, next) {
   res.setHeader("Access-Control-Allow-Origin", "*");
   res.setHeader("Access-Control-Allow-Credentials", "true");
   res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
   res.setHeader(
     "Access-Control-Allow-Headers",
     "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
   );
   next();
 });
 
app.use(express.json());

app.use('/v1', router);

app.listen(port, _ => {
   console.log(`http://localhost:${port}`);
});