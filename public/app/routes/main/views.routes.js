"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("../../middlewares");
const authentication_1 = require("../../middlewares/auth/authentication");
exports.main_router = express_1.default.Router();
exports.main_router.get('/home', middlewares_1.mainView);
exports.main_router.get('/login', middlewares_1.loginView);
exports.main_router.post('/login', authentication_1.login);
