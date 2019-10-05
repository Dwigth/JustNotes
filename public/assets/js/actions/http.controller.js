"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
class HTTPController {
    constructor() { }
    static POST(data, uri) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield fetch(config_1.URL + uri, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: config_1.header
            }).then(res => res.json())
                .catch(error => error)
                .then((response) => response);
        });
    }
    static GET(uri) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield fetch(config_1.URL + uri, {
                method: 'GET',
                headers: config_1.header
            }).then(res => res.json())
                .catch((error) => error)
                .then((response) => response);
        });
    }
}
exports.HTTPController = HTTPController;
