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

const JWT_SECRET = process.env.JWT_SECRET || "ma_clef_secrète";

// ─────────── REGISTER ───────────
export const register = async (req: Request, res: Response) => {
  try {
    const { nom, prenom, email, role, mot_de_passe } = req.body;
    if (!nom || !prenom || !email || !role || !mot_de_passe) {
      return res.status(400).json({ message: "Champs manquants" });
    }

    const existing = await getUserByEmail(email);
    if (existing) return res.status(409).json({ message: "Email déjà utilisé" });

    const newUser = await createUser({ nom, prenom, email, role, mot_de_passe });
    const { mot_de_passe: mdp, ...userSansMdp } = newUser.toJSON();
    res.status(201).json(userSansMdp);
  } catch (err) {
    console.error("register →", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// ─────────── LOGIN ───────────
export const login = async (req: Request, res: Response) => {
  try {
    const { email, mot_de_passe } = req.body;
    if (!email || !mot_de_passe) {
      return res.status(400).json({ message: "Email et mot de passe requis" });
    }

    const user = await getUserByEmail(email);
    if (!user) return res.status(401).json({ message: "Identifiants incorrects" });

    const ok = await verifyPassword(mot_de_passe, user.mot_de_passe);
    if (!ok) return res.status(401).json({ message: "Identifiants incorrects" });

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, {
      expiresIn: "1d",
    });

    const { mot_de_passe: mdp, ...userSansMdp } = user.toJSON(); // on exclut le mot de passe

    res.status(200).json({ token, user: userSansMdp });
  } catch (err) {
    console.error("login →", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// ─────────── LOGOUT (symbolique) ───────────
export const logout = (_req: Request, res: Response) => {
  res.status(200).json({ message: "Déconnexion réussie (côté client)" });
};

// ─────────── GET CONNECTED USER ───────────
export const getMe = async (req: Request, res: Response) => {
  try {
    const userFromToken = (req as any).user;
    if (!userFromToken?.id) {
      return res.status(401).json({ message: "Non authentifié" });
    }

    const user = await getUserById(userFromToken.id);
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

    const { mot_de_passe, ...userSansMdp } = user.toJSON();
    res.status(200).json(userSansMdp);
  } catch (err) {
    console.error("getMe →", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// ─────────── GET ALL USERS ───────────
export const getAll = async (_req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    console.error("getAll →", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// ─────────── UPDATE USER ───────────
export const update = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.id);
    if (!userId) return res.status(400).json({ message: "ID manquant" });
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Aucune donnée à mettre à jour" });
    }

    const updatedUser = await updateUser(userId, req.body);
    if (!updatedUser) return res.status(404).json({ message: "Utilisateur non trouvé" });

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error("update →", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// ─────────── DELETE USER ───────────
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.id);
    if (!userId) return res.status(400).json({ message: "ID manquant" });

    const nb = await deleteUserService(userId);
    if (!nb) return res.status(404).json({ message: "Utilisateur non trouvé" });

    res.status(200).json({ message: "Utilisateur supprimé" });
  } catch (err) {
    console.error("deleteUser →", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
