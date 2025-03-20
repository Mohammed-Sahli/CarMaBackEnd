import express from "express";
import { register, login, logout, getAllUsers, updateUser, deleteUser } from "../controllers/userAuthControllers";

const router = express.Router()

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Inscription d'un nouvel utilisateur
 *     tags: [01-Utilisateurs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nom
 *               - email
 *               - mot_de_passe
 *             properties:
 *               nom:
 *                 type: string
 *               prenom:
 *                 type: string
 *               email:
 *                 type: string
 *               telephone:
 *                 type: string
 *               mot_de_passe:
 *                 type: string
 *     responses:
 *       200:
 *         description: Utilisateur créé avec succès
 *       400:
 *         description: Champs obligatoires manquants ou email déjà existant
 *       500:
 *         description: Erreur interne du serveur
 */
router.post("/register", register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Connexion utilisateur
 *     tags: [01-Utilisateurs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Connexion réussie
 *       400:
 *         description: Champs obligatoires manquants
 *       401:
 *         description: Mot de passe invalide
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
router.post("/login", login);

/**
 * @swagger
 * /auth/update:
 *   put:
 *     summary: Met à jour un utilisateur existant
 *     tags: [01-Utilisateurs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: ID de l'utilisateur à mettre à jour
 *                 example: 1
 *               nom:
 *                 type: string
 *                 description: Nouveau nom de l'utilisateur
 *                 example: Dupont
 *               prenom:
 *                 type: string
 *                 description: Nouveau prénom de l'utilisateur
 *                 example: Jean
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Nouvel email de l'utilisateur
 *                 example: jean.dupont@example.com
 *               telephone:
 *                 type: string
 *                 description: Nouveau numéro de téléphone de l'utilisateur
 *                 example: "+33123456789"
 *               mot_de_passe:
 *                 type: string
 *                 description: Nouveau mot de passe (optionnel)
 *                 example: "NouveauMotDePasse123!"
 *     responses:
 *       200:
 *         description: Utilisateur mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Utilisateur mis à jour avec succès"
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.put("/update", updateUser);

/**
 * @swagger
 * /auth/delete/{email}:
 *   post:
 *     summary: Supprimer un utilisateur par son adresse e-mail
 *     description: Cette route permet de supprimer un utilisateur en fonction de son adresse e-mail. Si l'utilisateur est trouvé, il sera supprimé de la base de données.
 *     tags: [01-Utilisateurs]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: L'adresse e-mail de l'utilisateur à supprimer
 *         schema:
 *           type: string
 *           format: email
 *     responses:
 *       200:
 *         description: L'utilisateur a été supprimé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Utilisateur supprimé avec succès"
 *       404:
 *         description: L'utilisateur avec l'adresse e-mail fournie n'a pas été trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Utilisateur non trouvé"
 *       500:
 *         description: Une erreur serveur s'est produite
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erreur serveur"
 *                 error:
 *                   type: object
 *                   description: Détails de l'erreur
 */
router.post("/delete/:email", deleteUser);

/**
 * @swagger
 * /auth/list:
 *   get:
 *     summary: Liste de tous les utilisateurs
 *     tags: [01-Utilisateurs]
 *     responses:
 *       200:
 *         description: Liste des utilisateurs récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   nom:
 *                     type: string
 *                   prenom:
 *                     type: string
 *                   email:
 *                     type: string
 *                   telephone:
 *                     type: string
 *       500:
 *         description: Erreur interne du serveur
 */
router.get("/list", getAllUsers);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Déconnexion utilisateur
 *     tags: [01-Utilisateurs]
 *     responses:
 *       200:
 *         description: Déconnexion réussie
 */
router.post("/logout", logout);

export default router;
