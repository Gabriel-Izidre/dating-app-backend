import fs from 'fs';
import path from 'path';

const logDir = path.join(__dirname, '../../logs');
const logFile = path.join(logDir, 'error.txt');

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

export function logError(error: unknown) {
  const now = new Date().toISOString();
  const message = typeof error === 'string' ? error : (error instanceof Error ? error.stack || error.message : JSON.stringify(error));
  fs.appendFileSync(logFile, `[${now}] ${message}\n`);
}
