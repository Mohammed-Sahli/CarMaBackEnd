import express from "express";
import { createAssurance, updateAssurance, deleteAssurance, getAllAssurance } from "../controllers/assuranceControllers";

const router = express.Router()

/**
 * @swagger
 * /create:
 *   post:
 *     summary: Créer un contrat d'assurance
 *     tags: [03-Assurances]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               vehicule_id:
 *                 type: integer
 *               assureur:
 *                 type: string
 *               numero_police:
 *                 type: string
 *               type_assurance:
 *                 type: string
 *               date_debut:
 *                 type: string
 *                 format: date
 *               date_fin:
 *                 type: string
 *                 format: date
 *               cout_annuel:
 *                 type: number
 *     responses:
 *       200:
 *         description: Contrat d'assurance créé avec succès
 *       400:
 *         description: Champs obligatoires manquants
 *       500:
 *         description: Erreur serveur
 */
router.post("/create", createAssurance);

/**
 * @swagger
 * /update/{id}:
 *   put:
 *     summary: Mettre à jour un contrat d'assurance
 *     tags: [03-Assurance]
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
 *               assureur:
 *                 type: string
 *               numero_police:
 *                 type: string
 *               type_assurance:
 *                 type: string
 *               date_debut:
 *                 type: string
 *                 format: date
 *               date_fin:
 *                 type: string
 *                 format: date
 *               cout_annuel:
 *                 type: number
 *     responses:
 *       200:
 *         description: Contrat d'assurance mis à jour avec succès
 *       404:
 *         description: Contrat non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.put("/update/:id", updateAssurance);

/**
 * @swagger
 * /find/{id}:
 *   get:
 *     summary: Récupérer un contrat d'assurance par son ID
 *     tags: [03-Assurance]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Contrat d'assurance trouvé
 *       404:
 *         description: Contrat non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.get("/find/:id", getAllAssurance);

/**
 * @swagger
 * /list:
 *   get:
 *     summary: Récupérer tous les contrats d'assurance
 *     tags: [03-Assurance]
 *     responses:
 *       200:
 *         description: Liste des contrats d'assurance
 *       500:
 *         description: Erreur serveur
 */
router.get("/list", getAllAssurance);

export default router;