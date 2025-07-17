"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = void 0;
exports.register = register;
exports.login = login;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.logout = logout;
const pwdUtils_1 = require("../utils/pwdUtils");
const JWTUtils_1 = require("../utils/JWTUtils");
const syncModels_1 = require("../models/syncModels");
//===================================================
// ATTENTION : AJOUTER LES CONTROLES SUR LES CHAMPS
//===================================================
function register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Champs requis
            const { nom, prenom, email, telephone, mot_de_passe } = req.body;
            // Vérification des champs obligatoires
            if (!nom || !email || !mot_de_passe) {
                res.status(400).json({ message: "Les champs nom, email et mot de passe sont obligatoires !" });
                return;
            }
            //Hachage du mot de passe
            const hashedPassword = yield (0, pwdUtils_1.hashPassword)(mot_de_passe);
            // Création d'un nouvel utilisateur en Sequelize
            const newUser = yield syncModels_1.Utilisateur.create({
                nom,
                prenom,
                email,
                telephone,
                mot_de_passe: hashedPassword, // Stocke le mot de passe hashé
            });
            //Suppression du hash avant envoi
            const userResponse = Object.assign(Object.assign({}, newUser.get()), { mot_de_passe: undefined });
            res.status(200).json({ message: 'Utilisateur créé avec succès !', userResponse });
        }
        catch (err) {
            console.log(err.message);
            //Gestion des erreurs (cas d'email déjà existant)
            if (err.name === "SequelizeUniqueConstraintError") {
                res.status(400).json({ message: "Email ou nom déjà existant." });
                return;
            }
            console.error("Erreur lors de l'inscription :", err);
            res.status(500).json({ message: "Erreur interne du serveur." });
        }
    });
}
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        try {
            // Vérification des champs obligatoires
            if (!email || !password) {
                res.status(400).json({ message: "Champs email et password obligatoires !" });
                return;
            }
            // Recherche de l'utilisateur avec Sequelize
            const user = yield syncModels_1.Utilisateur.findOne({ where: { email } });
            if (!user) {
                res.status(404).json({ message: "Utilisateur non trouvé !" });
                return;
            }
            // Vérification du mot de passe avec bcrypt
            const isPasswordValid = yield (0, pwdUtils_1.verifyPassword)(password, user.mot_de_passe);
            if (!isPasswordValid) {
                res.status(401).json({ message: "Mot de passe invalide !" });
                return;
            }
            //Génération du token JWT
            const token = (0, JWTUtils_1.generateToken)({ id: user.id });
            console.log("NODE_ENV =", process.env.NODE_ENV);
            // Stocker le token dans un cookie sécurisé
            res.cookie("jwt", token, {
                httpOnly: true,
                sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
                secure: process.env.NODE_ENV === "production"
            });
            res.status(200).json({ message: "Login réussi !" });
        }
        catch (err) {
            console.error("Erreur lors de l'authentification :", err);
            res.status(500).json({ message: err.message });
        }
    });
}
function updateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const { nom, prenom, email, telephone, mot_de_passe } = req.body;
        try {
            const user = yield syncModels_1.Utilisateur.findByPk(id);
            if (!user) {
                res.status(404).json({ message: "Utilisateur non trouvé !" });
                return;
            }
            const hashedPassword = mot_de_passe ? yield (0, pwdUtils_1.hashPassword)(mot_de_passe) : user.mot_de_passe;
            yield user.update({ nom, prenom, email, telephone, mot_de_passe: hashedPassword });
            res.status(200).json({ message: "Utilisateur mis à jour avec succès" });
        }
        catch (error) {
            res.status(500).json({ message: "Erreur serveur", error });
        }
    });
}
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const user = yield syncModels_1.Utilisateur.findByPk(id);
            if (!user) {
                res.status(404).json({ message: "Utilisateur non trouvé !" });
                return;
            }
            yield user.destroy();
            res.status(200).json({ message: "Utilisateur supprimé avec succès" });
        }
        catch (error) {
            res.status(500).json({ message: "Erreur serveur", error });
        }
    });
}
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield syncModels_1.Utilisateur.findAll(); // Exemple avec Sequelize
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
});
exports.getAllUsers = getAllUsers;
function logout(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.clearCookie("jwt");
        res.status(200).json({ message: "Déconnexion réussie !" });
    });
}
