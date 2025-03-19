import { Request, Response } from "express";
import { hashPassword, verifyPassword } from "../utils/pwdUtils";
import { generateToken } from "../utils/JWTUtils";
import sequelize from "../config/database";
import { Utilisateur } from "../models/syncModels";

//===================================================
// ATTENTION : AJOUTER LES CONTROLES SUR LES CHAMPS
//===================================================

export async function register(req: Request, res: Response) {
    try {
        // Champs requis
        const { nom, prenom, email, telephone, mot_de_passe } = req.body;

        // Vérification des champs obligatoires
            if (!nom || !email || !mot_de_passe) {
                res.status(400).json({ message: "Les champs nom, email et password sont obligatoires !" });
                return
            }

        //Hachage du mot de passe
        const hashedPassword = await hashPassword(mot_de_passe);

        // Création d'un nouvel utilisateur en Sequelize
        const newUser = await Utilisateur.create({
            nom,
            prenom,
            email,
            telephone,
            mot_de_passe:hashedPassword, // Stocke le mot de passe hashé
        });

        //Suppression du hash avant envoi
        const userResponse = { ...newUser.get(), mot_de_passe: undefined };
       
        res.status(200).json({message:'Utilisateur créé avec succès !',userResponse});
             
        } catch (err: any) {
            console.log(err.message);
            //Gestion des erreurs (cas d'email déjà existant)
            if (err.name === "SequelizeUniqueConstraintError") {
                 res.status(400).json({ message: "Email ou nom déjà existant." });
                return
            }
        console.error("Erreur lors de l'inscription :", err);
        res.status(500).json({ message: "Erreur interne du serveur." });
    }
}

export async function login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
        // Vérification des champs obligatoires
        if (!email || !password) {
            res.status(400).json({ message: "Champs email et password obligatoires !" });
            return
        }

        // Recherche de l'utilisateur avec Sequelize
        const user = await Utilisateur.findOne({ where: { email } });

        if (!user) {
            res.status(404).json({ message: "Utilisateur non trouvé !" });
            return
        }

        // Vérification du mot de passe avec bcrypt
        const isPasswordValid = await verifyPassword(password, user.mot_de_passe)

        if (!isPasswordValid) {
            res.status(401).json({ message: "Mot de passe invalide !" });
            return
        }

        //Génération du token JWT
        const token = generateToken({ id: user.id })
        console.log("NODE_ENV =", process.env.NODE_ENV);

        // Stocker le token dans un cookie sécurisé
        res.cookie("jwt", token, {
            httpOnly: true,
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            secure: process.env.NODE_ENV === "production"
        });

        res.status(200).json({ message: "Login réussi !" });
    } catch (err: any) {
        console.error("Erreur lors de l'authentification :", err);
        res.status(500).json({ message: err.message });
    }
} 

export async function updateUser(req: Request, res: Response) {
    const { email } = req.params;
    const { nom, prenom, email: newEmail, telephone, mot_de_passe } = req.body;

    try {
        const user = await Utilisateur.findByPk(email);
        if (!user) {
            res.status(404).json({ message: "Utilisateur non trouvé" });
            return 
        }

        const hashedPassword = mot_de_passe ? await hashPassword(mot_de_passe) : user.mot_de_passe;
        
        await user.update({ nom, prenom, email: newEmail, telephone, mot_de_passe: hashedPassword });

        res.status(200).json({ message: "Utilisateur mis à jour avec succès" });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
}

export async function deleteUser(req: Request, res: Response) {
    const { email } = req.params;

    try {
        const user = await Utilisateur.findOne({ where: { email } });
        if (!user) {
            res.status(404).json({ message: "Utilisateur non trouvé" });
            return 
        }

        await user.destroy();
        res.status(200).json({ message: "Utilisateur supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
}

export const getAllUsers = async (req: Request, res: Response) => {
    try {
      const users = await Utilisateur.findAll(); // Exemple avec Sequelize
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur", error });
    }
  };



export async function logout(req: Request, res: Response) {
    res.clearCookie("jwt");
    res.status(200).json({ message: "Déconnexion réussie !" });
}