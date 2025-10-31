import { z } from 'zod';

export const registerSchema = z.object({
  firstName: z.string().min(3, 'Primeiro nome é obrigatório').trim(),
  lastName: z.string().min(1, 'Último nome é obrigatório').trim(),
  dob: z.string()
    .transform((str) => {
      if (/^\d{4}-\d{2}-\d{2}$/.test(str)) return new Date(str);
      if (/^\d{2}\/\d{2}\/\d{4}$/.test(str)) {
        const [dia, mes, ano] = str.split('/');
        return new Date(`${ano}-${mes}-${dia}`);
      }
      return new Date(str);
    })
    .refine((date) => date instanceof Date && !isNaN(date.getTime()), 'Data de nascimento inválida')
    .refine((date) => date >= new Date('2000-01-01'), 'Data de nascimento inválida')
    .refine((date) => {
      const today = new Date();
      let age = today.getFullYear() - date.getFullYear();
      const m = today.getMonth() - date.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < date.getDate())) age--;
      return age >= 18;
    }, 'É necessário ter pelo menos 18 anos')
    .transform((date) => date),
  email: z.string().email('E-mail inválido').transform((str) => str.trim().toLowerCase()),
  password: z.string().min(8, 'A senha deve ter pelo menos 8 caracteres'),
  confirmPassword: z.string().min(8, 'A confirmação de senha é obrigatória'),
  gender: z.enum(['male', 'female'], 'Gênero é obrigatório'),
  preference: z.enum(['male', 'female'], 'Preferência é obrigatória'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'As senhas não coincidem',
});

export const loginSchema = z.object({
  email: z.string().email('E-mail inválido').transform((str) => str.trim().toLowerCase()),
  password: z.string().min(8, 'Senha é obrigatória'),
});

export type RegisterDTO = z.infer<typeof registerSchema>;
export type LoginDTO = z.infer<typeof loginSchema>;
