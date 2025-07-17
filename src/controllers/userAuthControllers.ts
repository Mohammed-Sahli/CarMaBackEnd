import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import {
  getUserByEmail,
  getUserById,
  getAllUsers,
  createUser,
  verifyPassword,
  updateUser,
  deleteUser as deleteUserService,
} from "../services/userService";

// Clé secrète JWT (par défaut en local)
const JWT_SECRET = process.env.JWT_SECRET || "ma_clef_secrete";

// Enregistrement
export const register = async (req: Request, res: Response) => {
  try {
    const { nom, prenom, email, role, motDePasse } = req.body;

    if (!nom || !prenom || !email || !role || !motDePasse) {
      return res.status(400).json({ message: "Champs manquants pour l'inscription" });
    }

    const existing = await getUserByEmail(email);
    if (existing) {
      return res.status(409).json({ message: "Email déjà utilisé" });
    }

    const newUser = await createUser({ nom, prenom, email, role, motDePasse });
    const { mot_de_passe, ...userSansMdp } = newUser.toJSON();

    res.status(201).json(userSansMdp);
  } catch (error) {
    console.error("Erreur register :", error);
    res.status(500).json({ message: "Erreur serveur lors de l'inscription" });
  }
};

// Connexion
export const login = async (req: Request, res: Response) => {
  try {
    const { email, motDePasse } = req.body;

    if (!email || !motDePasse) {
      return res.status(400).json({ message: "Email et mot de passe requis" });
    }

    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Identifiants incorrects" });
    }

    const isMatch = await verifyPassword(motDePasse, user.mot_de_passe);
    if (!isMatch) {
      return res.status(401).json({ message: "Identifiants incorrects" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error("Erreur login :", error);
    res.status(500).json({ message: "Erreur serveur lors de la connexion" });
  }
};

// Déconnexion (symbolique)
export const logout = async (_req: Request, res: Response) => {
  res.status(200).json({ message: "Déconnexion réussie (côté client)" });
};

// Liste des utilisateurs
export const getAll = async (_req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error("Erreur getAll :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Infos de l’utilisateur connecté ou par ID
export const getById = async (req: Request, res: Response) => {
  try {
    const userFromToken = (req as any).user;
    const userId = userFromToken?.id || Number(req.params.id);

    if (!userId) {
      return res.status(400).json({ message: "ID utilisateur manquant" });
    }

    const user = await getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Erreur getById :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Mise à jour
export const update = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.id);
    if (!userId) {
      return res.status(400).json({ message: "ID utilisateur manquant" });
    }

    const { nom, prenom, email, role } = req.body;
    if (!nom && !prenom && !email && !role) {
      return res.status(400).json({ message: "Aucune donnée fournie pour mise à jour" });
    }

    const updatedUser = await updateUser(userId, req.body);
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Erreur update :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Suppression
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.id);
    if (!userId) {
      return res.status(400).json({ message: "ID utilisateur manquant" });
    }

    const result = await deleteUserService(userId);
    if (!result) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.status(200).json({ message: "Utilisateur supprimé" });
  } catch (error) {
    console.error("Erreur delete :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
