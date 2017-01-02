'use strict';

/**
 * Created by garusis on 31/12/16.
 */
const _ = require('lodash');

const containsFunc = /(\w+)\(/;
const funcName = /((\.?\w+)+)\(/g;

const attached = {
    round: function (arg) {
        return Math.round(arg);
    },
    number: function (arg) {
        return parseInt(arg);
    }
};

let restfunc = module.exports = function () {
    return middleware;
};

/**
 * Allows attach and scope or a function to be used in requests. An scope is an object that contains multiple functions
 * @param scopeName
 * @param toAttachFunction
 */
restfunc.attach = function (scopeName, toAttachFunction) {
    attached[scopeName] = toAttachFunction;
};

function middleware(req, res, next) {
    let errorMessage = false;
    let query = {};

    _.every(req.query, function (operation, key) {
        if (containsFunc.test(operation)) {
            operation = operation.replace(funcName, 'attached.$1(');
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
}

