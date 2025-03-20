import express from "express";
import { createEntrerep, deleteEntrerep, getAllEntrerep, updateEntrerep } from "../controllers/entrerepControllers";

const router = express.Router()

/**
 * @swagger
 * /create:
 *   post:
 *     summary: Créer un nouvel entretien/réparation
 *     tags: [04-Entretiens/Réparations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - vehicule_id
 *             properties:
 *               vehicule_id:
 *                 type: integer
 *                 description: ID du véhicule
 *               type_entrerep:
 *                 type: string
 *               date_entrerep:
 *                 type: string
 *                 format: date
 *               garage:
 *                 type: string
 *               cout:
 *                 type: number
 *               kilometrage:
 *                 type: integer
 *               observation:
 *                 type: string
 *     responses:
 *       200:
 *         description: Entretien/Réparation créé avec succès
 *       400:
 *         description: Champs obligatoires manquants ou contrainte unique non respectée
 *       500:
 *         description: Erreur serveur
 */
router.post("/create", createEntrerep);

/**
 * @swagger
 * /update:
 *   put:
 *     summary: Mettre à jour un entretien/réparation
 *     tags: [04-Entretiens/Réparations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               vehicule_id:
 *                 type: integer
 *               type_entrerep:
 *                 type: string
 *               date_entrerep:
 *                 type: string
 *                 format: date
 *               garage:
 *                 type: string
 *               cout:
 *                 type: number
 *               kilometrage:
 *                 type: integer
 *               observation:
 *                 type: string
 *     responses:
 *       200:
 *         description: Entretien/Réparation mis à jour avec succès
 *       404:
 *         description: Entretien/Réparation non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.put("/update", updateEntrerep);

/**
 * @swagger
 * /delete:
 *   post:
 *     summary: Supprimer un entretien/réparation
 *     tags: [04-Entretiens/Réparations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Entretien/Réparation supprimé avec succès
 *       404:
 *         description: Entretien/Réparation non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.post("/delete", deleteEntrerep);

/**
 * @swagger
 * /list:
 *   get:
 *     summary: Récupérer la liste des entretiens/réparations
 *     tags: [04-Entretiens/Réparations]
 *     responses:
 *       200:
 *         description: Liste des entretiens/réparations retournée avec succès
 *       500:
 *         description: Erreur serveur
 */
router.get("/list", getAllEntrerep);

export default router;