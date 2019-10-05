import express from 'express';
import { main } from '../../middlewares/index.mw';
export const main_router = express.Router();

main_router.get('/', main)