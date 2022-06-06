const express = require("express");
const cors = require("cors");
const path = require('path');

const app = express();
const router = require('./router');

app.use(cors());
// app.use(express.static(path.join('..', '/app'))); niet nodig ?

app.use(express.json());

app.use((req, res, next) => {
    console.log('hello from the middleware');
    next();
});

app.use('/', router); //basis-url om van te starten (localhost:8000 nu)

module.exports = app;
