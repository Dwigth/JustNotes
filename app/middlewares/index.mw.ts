import { Response, Request } from "express";
export function main(req: Request, res: Response) {
    res.render('index', {});
}