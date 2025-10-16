import express from 'express';
import { getAll, createOne, getById, deleteOne } from '../controllers/adoption.controller.js';
const router = express.Router();
router.get('/', getAll);
router.post('/', createOne);
router.get('/:id', getById);
router.delete('/:id', deleteOne);
export default router;
