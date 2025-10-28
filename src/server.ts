import express from 'express';
import path from 'path';
import { PORT } from './config/index';
import { connect, disconnect } from './db/mongo';
import routes from './routes/index';

const app = express();
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use(routes);

async function start() {
  try {
    await connect();
    console.log('[server] Banco de dados conectado');

    const server = app.listen(PORT, () => {
      console.log(`[server] Servidor rodando em http://localhost:${PORT}`);
    });

    process.on('SIGINT', async () => {
      console.log('\n[server] Encerrando...');
      server.close();
      await disconnect();
      process.exit(0);
    });
  } catch (err) {
    console.error('[server] Falha ao iniciar', err);
    process.exit(1);
  }
}

start();
