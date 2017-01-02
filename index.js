'use strict';

/**
 * Created by garusis on 31/12/16.
 */
const express = require('express');
const _ = require('lodash');
const restfunc = require('./lib/index');

const app = express();

restfunc.attach('lazy', function (arg) {
    return 'lazyyyy-' + arg;
});

app.use(restfunc());

app.get('/test', function (req, res) {
    res.json(req.query);
});

const appPort = process.env.APP_PORT || 3000;
app.listen(appPort, function () {
    console.log(`App to test RESTfunc module is running at ${appPort} port`);
});