"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function checkLogin(req, res, next) {
    // let token = req.body;
    console.log(req.body);
    // if (token !== '' || token !== undefined) {
    //     res.render('index', {});
    // }
    next();
}
function main(req, res, next) {
    res.render('login', {});
}
exports.main = main;
