import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/index';
import { UserPayload } from '../interfaces/user-payload';

export const authenticate: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || typeof authHeader !== 'string') {
    return res.status(401).json({ erro: 'Cabeçalho de autorização ausente' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ erro: 'Token ausente' });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload as UserPayload;
    next();
  } catch (err) {
    return res.status(401).json({ erro: 'Token inválido ou expirado' });
  }
}

export default authenticate;
