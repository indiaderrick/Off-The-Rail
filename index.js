const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = require('./config/router');
const { port, dbURI } = require('./config/environment');

const mongoose = require('mongoose');

mongoose.connect(dbURI);

app.use(express.static(`${__dirname}/public`));
//
// app.get('/*', (req, res) => res.sendFile(`${__dirname}/public/index.html`));

app.listen(port, () => console.log(`Express is listening on port ${port}`));

app.use(bodyParser.json());
app.use('/api', router);

module.exports = app;
