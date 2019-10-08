"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function loginView(req, res, next) {
    res.render('login');
}
exports.loginView = loginView;
function mainView(req, res, next) {
    res.render('index');
}
exports.mainView = mainView;
