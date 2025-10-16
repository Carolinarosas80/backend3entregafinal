import jwt from 'jsonwebtoken';
export function authMiddleware(req,res,next){ const auth=req.headers.authorization; if(!auth) return res.status(401).json({ error: 'No token' }); const token=auth.split(' ')[1]; try{ const data=jwt.verify(token, process.env.JWT_SECRET); req.user=data; next(); }catch(err){ return res.status(401).json({ error: 'Invalid token' }); } }
