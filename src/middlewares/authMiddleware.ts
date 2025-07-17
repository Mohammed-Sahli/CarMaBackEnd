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
    console.error("❌ JWT_SECRET manquant dans les variables d'environnement.");
    return res.status(500).json({ message: "Erreur interne : configuration serveur incomplète" });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret) as AuthRequest["user"];
    req.user = decoded;
    next();
  } catch (err) {
    console.warn("❌ Token invalide ou expiré :", err);
    return res.status(403).json({ message: "Token invalide ou expiré" });
  }
};

export default authMiddleware;
