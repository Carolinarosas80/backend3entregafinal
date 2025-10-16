import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
export const getAll = async (req, res) => { const users = await User.find(); res.json(users); };
export const createOne = async (req, res) => { const { name, email, password } = req.body; const hash = await bcrypt.hash(password, 8); const u = new User({ name, email, password: hash }); const saved = await u.save(); res.status(201).json({ id: saved._id, email: saved.email }); };
export const login = async (req, res) => { const { email, password } = req.body; const user = await User.findOne({ email }); if(!user) return res.status(401).json({ error: 'Invalid credentials' }); const ok = await bcrypt.compare(password, user.password); if(!ok) return res.status(401).json({ error: 'Invalid credentials' }); const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' }); res.json({ token }); };
