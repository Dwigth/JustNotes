import express, { Response, Request } from 'express';
export const notas_router = express.Router();

notas_router.get('/index', (req: Request, res: Response) => {
    res.json('¡Éxito!');
});
