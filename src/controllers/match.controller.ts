import { Request, Response } from 'express';
import Match from '../models/match.model';

export const createMatch = async (req: Request, res: Response) => {
  try {
    const { user1, user2 } = req.body;
    const match = await Match.create({ user1, user2 });
    return res.status(201).json(match);
  } catch (err) {
    return res.status(500).json({ erro: 'Erro ao criar match', detalhes: err });
  }
};

export const getMatches = async (req: Request, res: Response) => {
  try {
    const matches = await Match.find();
    return res.json(matches);
  } catch (err) {
    return res.status(500).json({ erro: 'Erro ao buscar matches', detalhes: err });
  }
};

export const getUserMatches = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const matches = await Match.find({ $or: [{ user1: userId }, { user2: userId }] });
    return res.json(matches);
  } catch (err) {
    return res.status(500).json({ erro: 'Erro ao buscar matches do usuário', detalhes: err });
  }
};

export default { createMatch, getMatches, getUserMatches };
