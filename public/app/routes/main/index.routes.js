"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_mw_1 = require("../../middlewares/index.mw");
exports.main_router = express_1.default.Router();
exports.main_router.get('/', index_mw_1.main);
