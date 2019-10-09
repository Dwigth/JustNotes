import { Response, Request } from "express";
import { UserLogin } from "../../helpers/auth/user";
import { AuthenticationController } from "../../controllers/auth/authentication.controller";
/**
 * 
 * @param req Request
 * @param res Response
 * @param next Next
 * @todo Agregar un registerHelper para mostrar el mensaje de error https://handlebarsjs.com
 * TODO - hola
 */
export async function login(req: Request, res: Response, next?: any) {
    let userLogin: UserLogin = req.body;
    const auth = new AuthenticationController(userLogin);
    const valid = await auth.login();
    if (valid) {
        res.redirect('/home')
    } else {
        res.render('login',
            { msg: 'Parece que tus credenciales no coinciden, echales un vistazo.', error: true });
    }
}