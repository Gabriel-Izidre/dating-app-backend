import type { Request, Response } from 'express';
import InterestModel from '../models/interest.model';
import { logError } from '../utils/logger';

export async function getInterests(req: Request, res: Response) {
  console.log('[interest.controller] Entrou em getInterests');

  try {
    const interests = await InterestModel.find();
    const filteredInterests = interests.map((interest: any) => ({
      id: interest._id,
      name: interest.name,
      iconName: interest.iconName
    }));

    console.log('[interest.controller] Interesses retornados com sucesso');
    return res.status(200).json(filteredInterests);
  } catch (err) {
    logError(err);
    console.log('[interest.controller] Erro ao buscar interesses, verifique os logs');
    return res.status(500).json({ mensagem: 'Erro ao buscar interesses' });
  }
}
