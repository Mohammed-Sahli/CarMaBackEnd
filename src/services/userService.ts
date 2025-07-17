import bcrypt from "bcryptjs";
import Utilisateur from "../models/utilisateurModels";

interface IUserCreate {
  nom: string;
  prenom: string;
  email: string;
  role: string;
  motDePasse: string;
}

// Récupérer un utilisateur par email
export async function getUserByEmail(email: string) {
  return await Utilisateur.findOne({ where: { email } });
}

// Récupérer un utilisateur par ID
export async function getUserById(id: number) {
  return await Utilisateur.findByPk(id, {
    attributes: { exclude: ["mot_de_passe"] },
  });
}

// Récupérer tous les utilisateurs
export async function getAllUsers() {
  return await Utilisateur.findAll({
    attributes: { exclude: ["mot_de_passe"] },
    order: [["createdAt", "DESC"]],
  });
}

// Créer un nouvel utilisateur
export async function createUser(user: IUserCreate) {
  const hashedPassword = await bcrypt.hash(user.motDePasse, 10);
  return await Utilisateur.create({
    nom: user.nom,
    prenom: user.prenom,
    email: user.email,
    role: user.role,
    mot_de_passe: hashedPassword,
  });
}

// Vérifie les identifiants
export async function verifyPassword(plainPassword: string, hashedPassword: string) {
  return await bcrypt.compare(plainPassword, hashedPassword);
}

// Mise à jour d'un utilisateur
export async function updateUser(id: number, updates: Partial<IUserCreate> & { motDePasse?: string }) {
  const dataToUpdate: any = { ...updates };

  if (updates.motDePasse) {
    dataToUpdate.mot_de_passe = await bcrypt.hash(updates.motDePasse, 10);
    delete dataToUpdate.motDePasse;
  }

  await Utilisateur.update(dataToUpdate, { where: { id } });
  return getUserById(id);
}

// Suppression d’un utilisateur
export async function deleteUser(id: number) {
  return await Utilisateur.destroy({ where: { id } });
}
