import Utilisateur from "../models/utilisateurModels";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(password: string, hashed: string): Promise<boolean> {
  return bcrypt.compare(password, hashed);
}

export async function getUserByEmail(email: string) {
  return Utilisateur.findOne({ where: { email } });
}

export async function getUserById(id: number) {
  return Utilisateur.findByPk(id);
}

export async function getAllUsers() {
  return Utilisateur.findAll({ attributes: { exclude: ["mot_de_passe"] } });
}

export async function createUser(data: {
  nom: string;
  prenom: string;
  email: string;
  role: string;
  mot_de_passe: string;
}) {
  const hashed = await hashPassword(data.mot_de_passe);
  return Utilisateur.create({ ...data, mot_de_passe: hashed });
}

export async function updateUser(id: number, data: Partial<Omit<Utilisateur, "id">>) {
  const user = await getUserById(id);
  if (!user) return null;

  if (data.mot_de_passe) {
    data.mot_de_passe = await hashPassword(data.mot_de_passe);
  }

  await user.update(data);
  const userSansMdp = user.toJSON();
  delete (userSansMdp as any).mot_de_passe;
  return userSansMdp;
}

export async function deleteUser(id: number) {
  const user = await getUserById(id);
  if (!user) return 0;

  return user.destroy().then(() => 1);
}
