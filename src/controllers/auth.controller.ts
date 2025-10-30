import { compare } from 'bcrypt';
import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/index';
import { hashPassword } from '../libs/bcrypt';
import { saveUserProfilePhoto } from '../libs/multer';
import UserModel from '../models/user.model';
import { logError } from '../utils/logger';

export async function createUser(req: Request, res: Response) {
  console.log('[auth.controller] Entrou em createUser');

  const { firstName, lastName, email, dob, password, gender, preference } = req.body;
  try {
    const findedUser = await UserModel.findOne({ email });
    if (findedUser) {
      console.log('[auth.controller] Usuário já existe');
      return res.status(409).json({ mensagem: 'Usuário já existe' });
    }

    const passwordHash = await hashPassword(password);

    const newUser = await UserModel.create({
      firstName,
      lastName,
      email,
      dob,
      password: passwordHash,
      gender,
      preference,
    });

    const file = req.file;
    if (file) {
      newUser.profilePhotoUrl = saveUserProfilePhoto(newUser._id.toString(), file.path);
      await newUser.save();
    }

    const token = jwt.sign({ id: newUser._id, email: newUser.email }, JWT_SECRET, { expiresIn: '5h' });
    res.status(201).json({
      mensagem: 'Usuário criado com sucesso',
      token,
      user: {
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        profilePhotoUrl: newUser.profilePhotoUrl,
        gender: newUser.gender,
        preference: newUser.preference
      }
    });
    console.log('[auth.controller] Usuário criado com sucesso');
  } catch (err) {
    logError(err);
    console.log('[auth.controller] Erro ao criar usuário, verifique os logs');
    res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
}

export async function loginUser(req: Request, res: Response) {
  console.log('[auth.controller] Entrou em loginUser');

  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      console.log('[auth.controller] Usuário não encontrado');
      return res.status(404).json({ mensagem: 'Usuário não encontrado' });
    }

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      console.log('[auth.controller] Senha incorreta');
      return res.status(401).json({ mensagem: 'Senha incorreta' });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '5h' });
    res.status(200).json({ mensagem: 'Login realizado com sucesso', token });
    console.log('[auth.controller] Login realizado com sucesso');
  } catch (err) {
    logError(err);
    console.log('[auth.controller] Erro ao realizar login, verifique os logs');
    res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
}
