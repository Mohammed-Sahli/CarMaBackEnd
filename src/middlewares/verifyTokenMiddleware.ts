import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../utils/JWTUtils';

dotenv.config();

const SECRET_KEY = process.env.JWT_KEY;

export function verifyTokenMiddleware(req: Request, res: Response, next: NextFunction) {
  if (!SECRET_KEY) {
    console.error("SECRET_KEY non définie dans les variables d'environnement");
    return res.status(500).json({ message: "Erreur serveur" });
  }

  const cookie = req.headers.cookie;
  if (!cookie || !cookie.startsWith("jwt=")) {
    return res.status(401).json({ message: "Accès refusé. Cookie manquant ou invalide." });
  }

  const token = cookie.split("=")[1];

  if (!token) {
    return res.status(401).json({ message: "Accès refusé. Token manquant." });
  }

  try {
    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(403).json({ message: "Token invalide ou expiré." });
    }

    // Tu peux assigner une propriété simple à req ici si besoin
    (req as any).user = decoded;

    next();
  } catch (error: any) {
    console.error("Erreur lors de la vérification du token:", error);
    return res.status(500).json({ message: "Erreur interne du serveur" });
  }
}
