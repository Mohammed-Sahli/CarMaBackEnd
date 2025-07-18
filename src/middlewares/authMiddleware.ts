import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: {
    id: number;
    email: string;
    role: string;
    [key: string]: any;
  };
}

const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Accès non autorisé : token manquant ou invalide" });
  }
  const token = authHeader.split(" ")[1];
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    console.error("JWT_SECRET manquant");
    return res.status(500).json({ message: "Erreur interne serveur" });
  }
  try {
    const decoded = jwt.verify(token, jwtSecret) as { id: number; email: string; role: string; [key: string]: any };
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Erreur lors de la vérification du token JWT:", err);
    return res.status(403).json({ message: "Token invalide ou expiré" });
  }
};

export default authMiddleware;
