import { z } from 'zod';

export const registerSchema = z.object({
  firstName: z.string().min(3, 'Primeiro nome é obrigatório').trim(),
  lastName: z.string().min(1, 'Último nome é obrigatório').trim(),
  dob: z.date().min(new Date('2000-01-01'), 'Data de nascimento inválida'),
  email: z.string().email('E-mail inválido').transform((str) => str.trim().toLowerCase()),
  password: z.string().min(8, 'A senha deve ter pelo menos 8 caracteres'),
  confirmPassword: z.string().min(8, 'A confirmação de senha é obrigatória'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'As senhas não coincidem',
});

export const loginSchema = z.object({
  email: z.string().email('E-mail inválido').transform((str) => str.trim().toLowerCase()),
  password: z.string().min(8, 'Senha é obrigatória'),
});

export type RegisterDTO = z.infer<typeof registerSchema>;
export type LoginDTO = z.infer<typeof loginSchema>;
