
import fsPromises from 'fs/promises';
import path from 'path';

const filePath = path.join(process.cwd(), 'db.json');

export async function readJsonFile() {
  const jsonData = await fsPromises.readFile(filePath, 'utf-8');
  return JSON.parse(jsonData);
}

export async function writeJsonFile(data: any) {
  await fsPromises.writeFile(filePath, JSON.stringify(data, null, 2));
}
