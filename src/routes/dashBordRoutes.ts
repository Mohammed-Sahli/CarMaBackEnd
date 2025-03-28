import express from 'express';
import { vehiculeDetails, vehiculesParUtilisateur } from "../controllers/dashBoardControllers";

const router = express.Router()

/**
 * @swagger
 * /d/liste:
 *   get:
 *     summary: Récupère la liste des véhicules classés par utilisateur
 *     tags: [Tableaux de Bord]
 *     responses:
 *       200:
 *         description: Liste des utilisateurs avec leurs véhicules
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID de l'utilisateur
 *                   nom:
 *                     type: string
 *                     description: Nom de l'utilisateur
 *                   vehicules:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           description: ID du véhicule
 *                         marque:
 *                           type: string
 *                           description: Marque du véhicule
 *                         modele:
 *                           type: string
 *                           description: Modèle du véhicule
 *       500:
 *         description: Erreur serveur
 */
router.get("/liste", vehiculesParUtilisateur);

/**
 * @swagger
 * /d/details:
 *   get:
 *     summary: Récupère les détails et l'historique d'un véhicule
 *     tags: [Tableaux de Bord]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du véhicule à récupérer
 *     responses:
 *       200:
 *         description: Informations détaillées du véhicule
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID du véhicule
 *                 marque:
 *                   type: string
 *                   description: Marque du véhicule
 *                 modele:
 *                   type: string
 *                   description: Modèle du véhicule
 *                 assurances:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       assureur:
 *                         type: string
 *                         description: Nom de l'assureur
 *                       numero_police:
 *                         type: string
 *                         description: Numéro de police d'assurance
 *                 controles:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       date_controle:
 *                         type: string
 *                         format: date
 *                         description: Date du contrôle technique
 *                       resultat:
 *                         type: string
 *                         description: Résultat du contrôle
 *       404:
 *         description: Véhicule non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.get("/details", vehiculeDetails);

export default router;