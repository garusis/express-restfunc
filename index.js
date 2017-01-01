'use strict';

/**
 * Created by garusis on 31/12/16.
 */
const express = require('express');
const _ = require('lodash');

const app = express();

function test(operation) {
    eval(operation);
}

app.use(function (req, res, next) {

    let attached = {
        round: function (arg) {
            return Math.round(arg);
        },
        number: function (arg) {
            return parseInt(arg);
        },
        lazy: function (arg) {
            return 'lazyyyy-' + arg;
        }
    };

    const containsFunc = /(\w+)\(/;
    req.query = _.transform(req.query, function (result, operation, key) {
        if (containsFunc.test(operation)) {
            operation = operation.replace(/(\w+)\(/g, 'attached.$1(');
            return result[key] = eval(operation);
        }
        result[key] = operation;
    });

    next();
});

app.get('/test', function (req, res) {
    res.json(req.query);
});

const appPort = process.env.APP_PORT || 3000;
app.listen(appPort, function () {
    console.log(`App to test RESTfunc module is running at ${appPort} port`);
});