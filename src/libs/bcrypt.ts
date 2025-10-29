import { genSalt, hash } from 'bcrypt';
import { BCRYPT_SALT_ROUNDS } from '../config/index';

export async function hashPassword(password: string): Promise<string> {
  const salt = await genSalt(BCRYPT_SALT_ROUNDS);
  return await hash(password, salt);
}
