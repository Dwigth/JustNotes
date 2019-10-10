import { Response, Request } from "express";

export function loginView(req: Request, res: Response, next?: any) {
    res.render('login');
}

export function signupView(req: Request, res: Response, next?: any) {
    res.render('signup');
}

export function mainView(req: Request, res: Response, next: any) {
    res.render('index');
}