import type { Request, Response } from 'express';
import UserModel from '../models/user.model';
import { logError } from '../utils/logger';
import User from '../models/user.model';
import Action from '../models/action.model';
import { calculateAge } from '../utils/calculateAge';
import { saveUserPhotos } from '../libs/multer';

export async function getMe(req: Request, res: Response) {
  console.log('[user.controller] Entrou em getMe');

  try {
    const userId = req.user?.id;
    if (!userId) {
      console.log('[user.controller] Usuário não autenticado');
      return res.status(401).json({ mensagem: 'Usuário não autenticado' });
    }

    const user = await UserModel.findById(userId).populate('interests', 'name iconName');
    if (!user) {
      console.log('[user.controller] Usuário não encontrado');
      return res.status(404).json({ mensagem: 'Usuário não encontrado' });
    }

    const userObj = user.toObject();
    delete userObj.password;

    res.status(200).json({ user: userObj });
    console.log('[user.controller] Usuário encontrado com sucesso');
  } catch (err) {
    logError(err);
    console.log('[user.controller] Erro ao buscar usuário, verifique os logs');
    res.status(500).json({ mensagem: 'Erro ao buscar usuário' });
  }
}

export async function updateInterests(req: Request, res: Response) {
  console.log('[user.controller] Entrou em updateInterests');

  try {
    const userId = req.user?.id;
    if (!userId) {
      console.log('[user.controller] Usuário não autenticado');
      return res.status(401).json({ mensagem: 'Usuário não autenticado' });
    }

    const interests = req.body?.interests;
    if (!Array.isArray(interests)) {
      console.log('[user.controller] Interesses devem ser um array de IDs.');
      return res.status(400).json({ mensagem: 'Interesses devem ser um array de IDs.' });
    }

    const user = await UserModel.findByIdAndUpdate(
      userId,
      { interests },
      { new: true }
    ).populate('interests', 'name iconName');

    if (!user) {
      console.log('[user.controller] Usuário não encontrado');
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

export async function getSuggestedUsers(req: Request, res: Response) {
  console.log('[user.controller] Entrou em getSuggestedUsers');

  try {
    const userId = req.user?.id;
    if (!userId) {
      console.log('[user.controller] Usuário não autenticado');
      return res.status(401).json({ mensagem: 'Usuário não autenticado' });
    }

    const currentUser = await User.findById(userId).populate('interests');
    if (!currentUser) {
      console.log('[user.controller] Usuário não encontrado');
      return res.status(404).json({ mensagem: 'Usuário não encontrado' });
    }

    const currentAge = calculateAge(currentUser.dob);
    const currentInterests = currentUser.interests.map((i: any) => i._id.toString());
    const currentGender = currentUser.gender;
    const currentPreference = currentUser.preference;

    const alreadyInteracted = await Action.find({ senderId: userId }).select('targetId');
    const interactedUserIds = alreadyInteracted.map((a: any) => a.targetId.toString());

    const minAge = currentAge - 3;
    const maxAge = currentAge + 3;
    const minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - maxAge);
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() - minAge);

    const users = await User.find({
      _id: { $ne: userId, $nin: interactedUserIds },
      dob: { $gte: minDate, $lte: maxDate },
      interests: { $in: currentInterests },
      gender: currentPreference,
      preference: currentGender
    })
      .populate('interests')
      .limit(20);

    const formattedUsers = users.map((user: any) => ({
      id: user._id,
      firstname: user.firstName,
      lastname: user.lastName,
      age: calculateAge(user.dob),
      gender: user.gender,
      interests: user.interests,
      profilePhoto: user.profilePhotoUrl,
      galleryPhotos: user.galleryPhotoUrls || []
    }));

    return res.status(200).json({
      users: formattedUsers,
      total: formattedUsers.length,
      hasMore: formattedUsers.length === 10
    });
  } catch (error) {
    logError(error);
    console.log('[user.controller] Erro ao buscar sugestões de usuários, verifique os logs');
    return res.status(500).json({ mensagem: 'Erro ao buscar sugestões de usuários' });
  }
}

export async function getUserById(req: Request, res: Response) {
  console.log('[user.controller] Entrou em getUserById');
  try {
    const userId = req.params.id;
    if (!userId) {
      console.log('[user.controller] ID do usuário não fornecido');
      return res.status(400).json({ mensagem: 'ID do usuário não fornecido' });
    }

    const user = await UserModel.findById(userId).populate('interests', 'name iconName');
    if (!user) {
      console.log('[user.controller] Usuário não encontrado');
      return res.status(404).json({ mensagem: 'Usuário não encontrado' });
    }

    const aux = user.toObject();
    const { password, birthDate, email, createdAt, updatedAt, ...rest } = aux;
    const idade = birthDate ? calculateAge(birthDate) : undefined;
    const userObj = { ...rest, idade };

    console.log('[user.controller] Usuário encontrado com sucesso');
    return res.status(200).json({ user: userObj });
  } catch (error) {
    logError(error);
    console.log('[user.controller] Erro ao buscar usuário por ID, verifique os logs');
    return res.status(500).json({ mensagem: 'Erro ao buscar usuário' });
  }
}

export async function uploadUserPhotos(req: Request, res: Response) {

  try {
    const userId = req.user?.id;
    if (!userId) {
      console.log('[user.controller] Usuário não autenticado');
      return res.status(401).json({ mensagem: 'Usuário não autenticado' });
    }

    if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
      console.log('[user.controller] Nenhuma imagem enviada');
      return res.status(400).json({ mensagem: 'Nenhuma imagem enviada' });
    }

    const tmpPaths = req.files.map((file: any) => file.path);
    const finalPaths = saveUserPhotos(userId, tmpPaths);
    await UserModel.findByIdAndUpdate(userId, { $push: { photos: { $each: finalPaths } } });

    console.log('[user.controller] Imagens enviadas com sucesso');
    return res.status(200).json({ mensagem: 'Imagens enviadas com sucesso', photos: finalPaths });
  } catch (error) {
    logError(error);
    console.log('[user.controller] Erro ao fazer upload das imagens, verifique os logs');
    return res.status(500).json({ mensagem: 'Erro ao fazer upload das imagens' });
  }
}
