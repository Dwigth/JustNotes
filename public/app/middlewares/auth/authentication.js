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
const authentication_controller_1 = require("../../controllers/auth/authentication.controller");
/**
 *
 * @param req Request
 * @param res Response
 * @param next Next
 * @todo Agregar un registerHelper para mostrar el mensaje de error https://handlebarsjs.com
 */
function login(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let userLogin = req.body;
        const auth = new authentication_controller_1.AuthenticationController(userLogin);
        const valid = yield auth.login();
        if (valid) {
            res.redirect('/home');
        }
        else {
            res.render('login', { msg: 'Parece que tus credenciales no coinciden, echales un vistazo.', error: true });
        }
    });
}
exports.login = login;
