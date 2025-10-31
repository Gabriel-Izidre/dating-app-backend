import { z } from 'zod';

export const actionSchema = z.object({
  targetUser: z.string().min(1, 'ID do usuário alvo é obrigatório'),
  type: z.number().int().refine(val => val === 1 || val === 2, 'Tipo de ação inválido'),
});
