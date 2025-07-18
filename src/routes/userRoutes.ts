import express from "express";
import {
  register,
  login,
  logout,
  update,
  deleteUser,
  getAll,
  getMe,
} from "../controllers/userAuthControllers";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Gestion des utilisateurs (authentification et administration)
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Création d'un nouvel utilisateur
 *     tags:
 *       [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nom
 *               - prenom
 *               - email
 *               - role
 *               - mot_de_passe
 *             properties:
 *               nom:
 *                 type: string
 *                 example: Sahli
 *               prenom:
 *                 type: string
 *                 example: Mohammed
 *               email:
 *                 type: string
 *                 format: email
 *                 example: mohammed.sahli@outlook.com
 *               role:
 *                 type: string
 *                 example: admin
 *               mot_de_passe:
 *                 type: string
 *                 example: mspwd
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Champs manquants
 *       409:
 *         description: Email déjà utilisé
 *       500:
 *         description: Erreur serveur interne
 */
router.post("/register", register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Connexion d'un utilisateur
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - mot_de_passe
 *             properties:
 *               email:
 *                 type: string
 *               mot_de_passe:
 *                 type: string
 *     responses:
 *       200:
 *         description: Connexion réussie
 *       401:
 *         description: Identifiants invalides
 */
router.post("/login", login);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Déconnexion de l'utilisateur (JWT obligatoire)
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Déconnexion réussie
 *       401:
 *         description: Utilisateur non authentifié
 */
router.post("/logout", authMiddleware, logout);

/**
 * @swagger
 * /auth/update/{id}:
 *   put:
 *     summary: Mettre à jour un utilisateur
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de l'utilisateur
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *               prenom:
 *                 type: string
 *               email:
 *                 type: string
 *               telephone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Utilisateur mis à jour
 *       404:
 *         description: Utilisateur non trouvé
 */
router.put("/update/:id", authMiddleware, update);

/**
 * @swagger
 * /auth/delete/{id}:
 *   delete:
 *     summary: Supprimer un utilisateur
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de l'utilisateur à supprimer
 *     responses:
 *       200:
 *         description: Utilisateur supprimé
 *       404:
 *         description: Utilisateur non trouvé
 */
router.delete("/delete/:id", authMiddleware, deleteUser);

/**
 * @swagger
 * /auth/list:
 *   get:
 *     summary: Récupérer tous les utilisateurs
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des utilisateurs
 *       401:
 *         description: Non autorisé
 */
router.get("/list", authMiddleware, getAll);

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Récupérer les informations de l'utilisateur connecté
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Données de l'utilisateur connecté
 *       401:
 *         description: Non authentifié
 */
router.get("/me", authMiddleware, getMe);

export default router;
