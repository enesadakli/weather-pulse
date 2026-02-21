import fs from 'fs';
import path from 'path';

const DB_PATH = path.resolve('server/data/db.json');

function ensureDbFile() {
  if (!fs.existsSync(DB_PATH)) {
    fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
    fs.writeFileSync(DB_PATH, JSON.stringify({ users: [], goals: [] }, null, 2));
  }
}

export function readDb() {
  ensureDbFile();
  const raw = fs.readFileSync(DB_PATH, 'utf-8');
  return JSON.parse(raw);
}

export function writeDb(payload) {
  fs.writeFileSync(DB_PATH, JSON.stringify(payload, null, 2));
}
