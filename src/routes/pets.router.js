import express from 'express';
import { getAll, createOne } from '../controllers/pets.controller.js';
const router = express.Router();
router.get('/', getAll);
router.post('/', createOne);
export default router;
