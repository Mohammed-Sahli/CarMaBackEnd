import express from "express";
import { createVehicule, deleteVehicule, getAllVehicule, updateVehicule } from "../controllers/vehiculeControllers";

const router = express.Router()

/**
 * @swagger
 * /v/create:
 *   post:
 *     summary: Créer un nouveau véhicule
 *     tags: [02-Véhicules]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - immat
 *               - numero_chassis
 *               - utilisateur_id
 *             properties:
 *               immat:
 *                 type: string
 *               numero_chassis:
 *                 type: string
 *               utilisateur_id:
 *                 type: integer
 *               marque:
 *                 type: string
 *               modele:
 *                 type: string
 *               carburant:
 *                 type: string
 *               dmec:
 *                 type: string
 *                 format: date
 *               date_achat:
 *                 type: string
 *                 format: date
 *               prix_achat:
 *                 type: number
 *               kilometrage_achat:
 *                 type: number
 *     responses:
 *       200:
 *         description: Véhicule créé avec succès
 *       400:
 *         description: Données invalides ou véhicule déjà existant
 *       500:
 *         description: Erreur interne du serveur
 */
router.post("/create", createVehicule);

/**
 * @swagger
 * /v/update/{id}:
 *   put:
 *     summary: Mettre à jour un véhicule
 *     tags: [02-Véhicules]
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
 *               utilisateur_id:
 *                 type: integer
 *               date_achat:
 *                 type: string
 *                 format: date
 *               prix_achat:
 *                 type: number
 *               kilometrage_achat:
 *                 type: number
 *     responses:
 *       200:
 *         description: Véhicule mis à jour avec succès
 *       404:
 *         description: Véhicule non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.put("/update/:id", updateVehicule);

/**
 * @swagger
 * /v/delete/{id}:
 *   post:
 *     summary: Supprimer un véhicule
 *     tags: [02-Véhicules]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Véhicule supprimé avec succès
 *       404:
 *         description: Véhicule non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.post("/delete/:id", deleteVehicule);

/**
 * @swagger
 * /v/list:
 *   get:
 *     summary: Récupérer la liste des véhicules
 *     tags: [02-Véhicules]
 *     responses:
 *       200:
 *         description: Liste des véhicules récupérée avec succès
 *       500:
 *         description: Erreur serveur
 */
router.get("/list", getAllVehicule);

export default router;
