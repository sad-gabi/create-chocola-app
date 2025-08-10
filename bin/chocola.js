#!/usr/bin/env node
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const [, , command, projectName] = process.argv;

if (command === 'create' && projectName) {
  const targetPath = path.resolve(process.cwd(), projectName);

  if (fs.existsSync(targetPath)) {
    console.error(`Error: Directory ${projectName} already exists.`);
    process.exit(1);
  }

  // COPY TEMPLATE
  copyFolderRecursiveSync(path.resolve(__dirname, '../templates/base'), targetPath);

  console.log(`Project ${projectName} created!`);
  console.log(`Go to the directory with: cd ${projectName}`);
  console.log('Install dependencies with: npm install');
  console.log('And run with: npm run dev');

} else {
  console.log('Use: chocola create <project-name>');
}

function copyFolderRecursiveSync(src, dest) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest);
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyFolderRecursiveSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}
