import type { Request, Response } from 'express';
import UserModel from '../models/user.model';
import { logError } from '../utils/logger';

export async function getMe(req: Request, res: Response) {
  console.log('[user.controller] Entrou em getMe');

  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ mensagem: 'Usuário não autenticado' });
    }

    const user = await UserModel.findById(userId).populate('interests', 'name iconName');
    if (!user) {
      return res.status(404).json({ mensagem: 'Usuário não encontrado' });
    }

    const userObj = user.toObject();
    delete userObj.password;

    res.status(200).json({ user: userObj });
    console.log('[user.controller] Usuário encontrado com sucesso');
  } catch (err) {
    logError(err);
    res.status(500).json({ mensagem: 'Erro ao buscar usuário' });
    console.log('[user.controller] Erro ao buscar usuário, verifique os logs');
  }
}

export async function updateInterests(req: Request, res: Response) {
  console.log('[user.controller] Entrou em updateInterests');

  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ mensagem: 'Usuário não autenticado' });
    }

    const interests = req.body?.interests;
    if (!Array.isArray(interests)) {
      return res.status(400).json({ mensagem: 'Interesses devem ser um array de IDs.' });
    }

    const user = await UserModel.findByIdAndUpdate(
      userId,
      { interests },
      { new: true }
    ).populate('interests', 'name iconName');

    if (!user) {
      return res.status(404).json({ mensagem: 'Usuário não encontrado' });
    }

    res.status(200).json({ mensagem: 'Interesses atualizados com sucesso' });
    console.log('[user.controller] Interesses atualizados com sucesso');
  } catch (err) {
    logError(err);
    res.status(500).json({ mensagem: 'Erro ao atualizar interesses' });
    console.log('[user.controller] Erro ao atualizar interesses, verifique os logs');
  }
}
