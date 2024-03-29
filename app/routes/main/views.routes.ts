import express from 'express';
import { mainView, loginView, signupView } from '../../middlewares';
import { login } from '../../middlewares/auth/authentication';
export const main_router = express.Router();

main_router.get('/', loginView);
main_router.get('/home', mainView);
main_router.get('/login', loginView);
main_router.get('/signup', signupView);
main_router.post('/login', login);