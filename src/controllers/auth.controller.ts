import bcrypt from 'bcrypt';
import type { Request, Response } from "express";
import fs from 'fs';
import jwt from "jsonwebtoken";
import path from 'path';
import { BCRYPT_SALT_ROUNDS, JWT_SECRET } from "../config";
import UserModel from '../models/user.model';

export async function createUser(req: Request, res: Response) {
  const { firstName, lastName, email, dob, password, gender, preference } = req.body;
  try {
    const findedUser = await UserModel.findOne({ email });
    if (findedUser) {
      return res.status(409).json({ mensagem: "Usuário já existe" });
    }

    const salt = await bcrypt.genSalt(BCRYPT_SALT_ROUNDS);
    const passwordHash = await bcrypt.hash(password, salt);

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
      const userDir = path.join(__dirname, '../../uploads', newUser._id.toString());
      fs.mkdirSync(userDir, { recursive: true });
      const destPath = path.join(userDir, 'profile.jpg');
      fs.renameSync(file.path, destPath);
      newUser.profilePhotoUrl = `/uploads/${newUser._id}/profile.jpg`;
      await newUser.save();
    }

    res.status(201).json({ mensagem: "Usuário criado com sucesso", user: newUser });
  } catch {
    res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
}

export async function loginUser(req: Request, res: Response) {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ mensagem: "E-mail ou senha inválidos" });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "5h" });
    res.status(200).json({ mensagem: "Login realizado com sucesso", token });
  } catch {
    res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
}
