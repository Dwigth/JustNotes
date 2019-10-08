"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function test(req, res, next) {
    const token = req.body.token;
    if (token === undefined || token === '') {
        res.render('login');
    }
    next();
}
exports.test = test;
function main(req, res, next) {
    res.render('index', {});
}
exports.main = main;
