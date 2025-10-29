import { Router } from 'express';
import InterestModel from '../models/interest.model';
import { logError } from '../utils/logger';

const router = Router();

router.get('/', async (req, res) => {
  try {
    console.log('[interest.router] Buscando interesses');
    const interests = await InterestModel.find();
    const filteredInterests = interests.map((interest: any) => ({
      id: interest._id,
      name: interest.name,
      iconName: interest.iconName
    }));
    res.status(200).json({ interests: filteredInterests });
  } catch (err) {
    logError(err);
    res.status(500).json({ mensagem: 'Erro ao buscar interesses' });
    console.log('[interest.router] Erro ao buscar interesses, verifique os logs');
  }
});

export default router;
