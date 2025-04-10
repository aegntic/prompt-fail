import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ESM-compatible __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const taskFile = path.join(__dirname, '../TASK.md');

function updateTaskStatus() {
  let content = fs.readFileSync(taskFile, 'utf-8');

  // Mark the first unchecked task in Phase 1 as done
  content = content.replace(
    /(- \[ \] Architect a scalable, modular React framework[^\n]*)/,
    (match) => match.replace('[ ]', '[x]')
  );

  fs.writeFileSync(taskFile, content, 'utf-8');
  console.log('TASK.md updated based on test success.');
}

updateTaskStatus();