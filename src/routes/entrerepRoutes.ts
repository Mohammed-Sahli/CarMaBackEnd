import express from "express";
import { createEntrerep, deleteEntrerep, getAllEntrerep, updateEntrerep } from "../controllers/entrerepControllers";

const router = express.Router()

/**
 * @swagger
 * /e/create:
 *   post:
 *     summary: Créer un nouvel entretien/réparation
 *     tags: [Entretiens/Réparations]
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
 * /e/update/{id}:
 *   put:
 *     summary: Met à jour une entrée d'entretien ou de réparation
 *     description: Met à jour les informations d'une entrée d'entretien/réparation avec l'ID spécifié.
 *     tags: [Entretiens/Réparations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'entrée d'entretien/réparation à mettre à jour
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
 *                 description: ID du véhicule concerné
 *                 example: 123
 *               type_entrerep:
 *                 type: string
 *                 description: Type d'entretien ou réparation
 *                 example: "Vidange"
 *               date_entrerep:
 *                 type: string
 *                 format: date
 *                 description: Date de l'intervention
 *                 example: "2025-03-20"
 *               garage:
 *                 type: string
 *                 description: Nom du garage
 *                 example: "Garage Auto Service"
 *               cout:
 *                 type: number
 *                 description: Coût de l'intervention
 *                 example: 250.50
 *               kilometrage:
 *                 type: integer
 *                 description: Kilométrage du véhicule lors de l'intervention
 *                 example: 50000
 *               observation:
 *                 type: string
 *                 description: Observations éventuelles
 *                 example: "Changement du filtre à huile"
 *     responses:
 *       200:
 *         description: Entrée d'entretien/réparation mise à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Entretien/Réparation mis à jour avec succès !"
 *       404:
 *         description: Entrée d'entretien/réparation non trouvée
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Entretien/Réparation non trouvé !"
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erreur serveur"
 *                 error:
 *                   type: string
 */
router.put("/update/:id", updateEntrerep);

/**
 * @swagger
 * /e/delete/{id}:
 *   delete:
 *     summary: Supprimer un entretien/réparation
 *     tags: [Entretiens/Réparations]
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
router.delete("/delete/:id", deleteEntrerep);

/**
 * @swagger
 * /e/list:
 *   get:
 *     summary: Récupérer la liste des entretiens/réparations
 *     tags: [Entretiens/Réparations]
 *     responses:
 *       200:
 *         description: Liste des entretiens/réparations retournée avec succès
 *       500:
 *         description: Erreur serveur
 */
router.get("/list", getAllEntrerep);

export default router;