import express from 'express';
import { getAll, createOne, login } from '../controllers/users.controller.js';
const router = express.Router();
router.get('/', getAll);
router.post('/', createOne);
router.post('/login', login);
export default router;
