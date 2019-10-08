import { Response, Request } from "express";

function checkLogin(req: Request, res: Response, next?: any) {
    // let token = req.body;
    console.log(req.body);

    // if (token !== '' || token !== undefined) {
    //     res.render('index', {});
    // }
    next();
}

export function main(req: Request, res: Response, next: any) {
    res.render('login', {});
}