import { Request, Response } from 'express';
import Action from '../models/action.model';
import { logError } from '../utils/logger';
import { createMatch } from './match.controller';
import { ActionType } from '../enum/action-type';

export async function createAction(req: Request, res: Response) {
  console.log('[action.controller] Entrou em createAction');

  try {
    const userId = req.user?.id;
    if (!userId) {
      console.log('[action.controller] Usuário não autenticado');
      return res.status(401).json({ mensagem: 'Usuário não autenticado' });
    }

    const { targetUser, type } = req.body;
    const action = await Action.create({ user: userId, targetUser, type });

    if (type === ActionType.LIKE) {
      const previousLike = await Action.findOne({ user: targetUser, targetUser: userId, type: ActionType.LIKE });
      let match = null;
      if (previousLike) {
        match = await createMatch(userId, targetUser);
        if (match) {
          return res.status(201).json({ action, match });
        }
      }
    }

    console.log('[action.controller] Ação registrada com sucesso');
    return res.status(201).json(action);
  } catch (err) {
    logError(err);
    console.log('[action.controller] Erro ao registrar ação, verifique os logs');
    return res.status(500).json({ erro: 'Erro ao registrar ação' });
  }
};
