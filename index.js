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
        number: {
            round: function (arg) {
                return Math.round(arg);
            },
            parse: function (arg) {
                return parseInt(arg);
            }
        },
        lazy: function (arg) {
            return 'lazyyyy-' + arg;
        }
    };

    const containsFunc = /(\w+)\(/;
    let query = {};
    let errorMessage = false;

    _.every(req.query, function (operation, key) {
        if (containsFunc.test(operation)) {
            operation = operation.replace(/((\.?\w+)+)\(/g, 'attached.$1(');
            try {
                return query[key] = eval(operation);
            } catch (err) {
                errorMessage = err.message;
                return false;
            }
        }
        query[key] = operation;
        return true;
    });
    req.query = query;

    if (errorMessage) res.status(406);
    next(errorMessage);
});

app.get('/test', function (req, res) {
    res.json(req.query);
});

const appPort = process.env.APP_PORT || 3000;
app.listen(appPort, function () {
    console.log(`App to test RESTfunc module is running at ${appPort} port`);
});