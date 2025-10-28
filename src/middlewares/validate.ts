import { NextFunction, Request, RequestHandler, Response } from 'express';
import { ZodType } from 'zod';

type Target = 'body' | 'params' | 'query';

export function validate(schema: ZodType, target: Target = 'body'): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    const toValidate = (req as any)[target];
    const result = schema.safeParse(toValidate);
    if (!result.success) {
      return res.status(400).json({ erro: 'Dados inválidos', detalhes: result.error.issues });
    }

    (req as any).validated = (req as any).validated || {};
    (req as any).validated[target] = result.data;
    next();
  };
}

export default validate;
