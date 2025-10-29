import { Request, Response } from 'express';
import Action from '../models/action.model';
import { logError } from '../utils/logger';

export async function createAction(req: Request, res: Response) {
  console.log('[action.controller] Entrou em createAction');

  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ mensagem: 'Usuário não autenticado' });
    }

    const { targetUser, type } = req.body;
    const action = await Action.create({ user: userId, targetUser, type });
    return res.status(201).json(action);
  } catch (err) {
    logError(err);
    return res.status(500).json({ erro: 'Erro ao registrar ação', detalhes: err });
  }
};

