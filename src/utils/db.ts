import { readJsonFile, writeJsonFile } from "@/libs/utils/db";

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
