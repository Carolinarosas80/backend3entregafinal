import Adoption from '../models/Adoption.js';
import { validateAdoptionPayload } from '../dto/adoption.dto.js';
import { NotFoundError } from '../errors/customErrors.js';
export const getAll = async (req, res, next) => { try { const items = await Adoption.find(); res.json(items); } catch(err){ next(err);} };
export const createOne = async (req, res, next) => { try { const data = validateAdoptionPayload(req.body); const a = new Adoption(data); const saved = await a.save(); res.status(201).json(saved); } catch(err){ if(err.status) return res.status(err.status).json({ error: err.message }); next(err);} };
export const getById = async (req, res, next) => { try { const item = await Adoption.findById(req.params.id); if(!item) throw new NotFoundError('Adoption not found'); res.json(item); } catch(err){ if(err.name==='CastError') return res.status(404).json({ error: 'Not found' }); if(err.status) return res.status(err.status).json({ error: err.message }); next(err);} };
export const deleteOne = async (req, res, next) => { try { const item = await Adoption.findByIdAndDelete(req.params.id); if(!item) throw new NotFoundError('Adoption not found'); res.json({ ok: true }); } catch(err){ if(err.status) return res.status(err.status).json({ error: err.message }); next(err);} };
