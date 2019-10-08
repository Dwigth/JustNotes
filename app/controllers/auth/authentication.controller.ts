import { UserLogin } from "../../helpers/auth/user";
import { M_USER } from "../../orm/common/user.model";
import { USER } from "../../helpers/common/User";

export class AuthenticationController {
    private userLogin: UserLogin;
    public User: USER;

    constructor(usrLogin?: { identity: string, password: string }) {
        if (usrLogin != undefined) { this.userLogin = usrLogin; }
    }

    public async login(): Promise<boolean> {
        return await M_USER.sequelize.query(`
        SELECT * FROM USUARIOS WHERE 
        (NOMBRE_USUARIO LIKE '%${this.userLogin.identity}%' OR CORREO LIKE  '%${this.userLogin.identity}%') 
        AND CONTRASENA = '${this.userLogin.password}'`)
            .then(response => {
                if (response[1].rowCount !== 0) {
                    this.User = response[0];
                    return true
                } else {
                    return false;
                }
            }).catch(e => false)
    }
}