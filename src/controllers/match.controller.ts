import { Request, Response } from 'express';
import Match from '../models/match.model';
import { logError } from '../utils/logger';

export async function createMatch(userId1: string, userId2: string) {
  console.log('[match.controller] Entrou em createMatch');

  try {
    const match = await Match.create({ user1: userId1, user2: userId2 });
    console.log('[match.controller] Match criado com sucesso');
    return match;
  } catch (err) {
    logError(err);
    console.log('[match.controller] Erro ao criar match, verifique os logs');
    return null;
  }
};

export async function getUserMatches(req: Request, res: Response) {
  console.log('[match.controller] Entrou em getUserMatches');

  try {
    const userId = req.user?.id;
    if (!userId) {
      console.log('[match.controller] Usuário não autenticado');
      return res.status(401).json({ mensagem: 'Usuário não autenticado' });
    }

    const matches = await Match.find({ $or: [{ user1: userId }, { user2: userId }] });
    console.log('[match.controller] Matches encontrados com sucesso');
    return res.json(matches);
  } catch (err) {
    logError(err);
    console.log('[match.controller] Erro ao buscar matches do usuário, verifique os logs');
    return res.status(500).json({ erro: 'Erro ao buscar matches do usuário' });
  }
};

export default { createMatch, getUserMatches };
