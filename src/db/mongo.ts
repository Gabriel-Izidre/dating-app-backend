import dotenv from 'dotenv';
import fs from 'fs';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import path from 'path';
import { logError } from '../utils/logger';

dotenv.config();

let mongoServer: MongoMemoryServer | null = null;

export async function connect() {
  const dbPath = path.resolve(__dirname, '../../db-registers');
  if (!fs.existsSync(dbPath)) {
    fs.mkdirSync(dbPath, { recursive: true });
  }

  mongoServer = await MongoMemoryServer.create({
    instance: {
      dbPath,
      storageEngine: 'wiredTiger'
    }
  });
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
  console.log('[db] Conectado ao banco em memória com persistência em db-registers');
}

export async function disconnect() {
  try {
    await mongoose.disconnect();
  } catch (err) {
    logError(err);
    console.error('[db] Erro ao desconectar do banco, verifique os logs');
  }

  if (mongoServer) {
    try {
      await mongoServer.stop();
    } catch (err) {
      logError(err);
      console.error('[db] Erro ao parar o banco em memória, verifique os logs');
    }
    mongoServer = null;
  }
}

export async function clearDatabase() {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    try {
      await collection.deleteMany({});
    } catch (err) {
      logError(err);
      console.error(`[db] Erro ao limpar a coleção ${key}, verifique os logs`);
    }
  }
}
