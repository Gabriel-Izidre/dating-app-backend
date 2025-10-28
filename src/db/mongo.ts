import dotenv from 'dotenv';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

dotenv.config();

let mongoServer: MongoMemoryServer | null = null;

export async function connect() {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
  console.log('[db] Conectado ao banco em memória');
}

export async function disconnect() {
  try {
    await mongoose.disconnect();
  } catch (err) {
    console.error('[db] Erro ao desconectar do banco', err);
  }

  if (mongoServer) {
    try {
      await mongoServer.stop();
    } catch (err) {
      console.error('[db] Erro ao parar o banco em memória', err);
    }
    mongoServer = null;
  }
}

export async function clearDatabase() {
  const collections = mongoose.connection.collections
  for (const key in collections) {
    const collection = collections[key];
    try {
      await collection.deleteMany({});
    } catch (err) {
      console.error(`[db] Erro ao limpar a coleção ${key}`, err);
    }
  }
}
