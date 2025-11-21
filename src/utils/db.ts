
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

export async function updateUserAvatar(userId: string, avatarPath: string) {
  const data = await readJsonFile();
  const users = data.users;

  const index = users.findIndex((u: any) => u.id === userId);
  if (index === -1) throw new Error("User not found");

  users[index].avatar = avatarPath;

  await writeJsonFile(data);

  const { password, ...userWithoutPassword } = users[index];
  return userWithoutPassword;
}
