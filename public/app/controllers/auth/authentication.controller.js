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
const user_model_1 = require("../../orm/common/user.model");
class AuthenticationController {
    constructor(usrLogin) {
        if (usrLogin != undefined) {
            this.userLogin = usrLogin;
        }
    }
    login() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.M_USER.sequelize.query(`
        SELECT * FROM USUARIOS WHERE 
        (NOMBRE_USUARIO LIKE '%${this.userLogin.identity}%' OR CORREO LIKE  '%${this.userLogin.identity}%') 
        AND CONTRASENA = '${this.userLogin.password}'`)
                .then(response => {
                if (response[1].rowCount !== 0) {
                    this.User = response[0];
                    return true;
                }
                else {
                    return false;
                }
            }).catch(e => false);
        });
    }
}
exports.AuthenticationController = AuthenticationController;
