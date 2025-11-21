import { readJsonFile, writeJsonFile } from "../utils/db";

export async function getUserData() {
  const data = await readJsonFile();
  return { data, users: data.users };
}

export function findUserIndex(users: any[], userId: string) {
  const index = users.findIndex((u) => u.id === userId);
  if (index === -1) throw new Error("User not found");
  return index;
}

export function checkEmailDuplicate(users: any[], email: string, currentIndex: number) {
  const exists = users.some((u, idx) => u.email === email && idx !== currentIndex);
  if (exists) throw new Error("Email đã được sử dụng");
}

export async function updateUserProfile(data: any, users: any[], index: number, payload: any) {
  users[index] = { ...users[index], ...payload };

  await writeJsonFile(data);

  const { password, ...withoutPassword } = users[index];
  return withoutPassword;
}
