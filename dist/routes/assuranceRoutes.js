"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const assuranceControllers_1 = require("../controllers/assuranceControllers");
const router = express_1.default.Router();
/**
 * @swagger
 * /a/create:
 *   post:
 *     summary: Créer un contrat d'assurance
 *     description: Endpoint pour enregistrer un nouveau contrat d'assurance pour un véhicule.
 *     tags: [Assurances]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               vehicule_id:
 *                 type: integer
 *                 description: ID du véhicule
 *               assureur:
 *                 type: string
 *                 description: Nom de l'assureur
 *               numero_police:
 *                 type: string
 *                 description: Numéro de police d'assurance
 *               type_assurance:
 *                 type: string
 *                 description: Type de l'assurance
 *               date_debut:
 *                 type: string
 *                 format: date
 *                 description: Date de début du contrat
 *               date_fin:
 *                 type: string
 *                 format: date
 *                 description: Date de fin du contrat
 *               cout_annuel:
 *                 type: number
 *                 format: float
 *                 description: Coût annuel de l'assurance
 *     responses:
 *       200:
 *         description: Contrat d'assurance créé avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Erreur dans les données envoyées.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.post("/create", assuranceControllers_1.createAssurance);
/**
 * @swagger
 * /a/update/{id}:
 *   put:
 *     summary: Mettre à jour un contrat d'assurance
 *     description: Modifier les détails d'un contrat d'assurance existant.
 *     tags: [Assurances]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du contrat d'assurance à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
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
 *                 format: float
 *     responses:
 *       200:
 *         description: Contrat mis à jour avec succès.
 *       400:
 *         description: Erreur dans les données envoyées.
 *       404:
 *         description: Contrat non trouvé.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.put("/update/:id", assuranceControllers_1.updateAssurance);
/**
 * @swagger
 * /a/delete/{id}:
 *   delete:
 *     summary: Supprimer un contrat d'assurance
 *     description: Supprime un contrat d'assurance par son ID.
 *     tags: [Assurances]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du contrat d'assurance à supprimer
 *     responses:
 *       200:
 *         description: Contrat supprimé avec succès.
 *       404:
 *         description: Contrat non trouvé.
 *       500:
 *         description: Erreur interne du serveur.
 */
router.delete("/delete/:id", assuranceControllers_1.deleteAssurance);
/**
 * @swagger
 * /a/all:
 *   get:
 *     summary: Récupérer tous les contrats d'assurance
 *     description: Retourne une liste de tous les contrats d'assurance enregistrés.
 *     tags: [Assurances]
 *     responses:
 *       200:
 *         description: Liste des contrats d'assurance récupérée avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   vehicule_id:
 *                     type: integer
 *                   assureur:
 *                     type: string
 *                   numero_police:
 *                     type: string
 *                   type_assurance:
 *                     type: string
 *                   date_debut:
 *                     type: string
 *                     format: date
 *                   date_fin:
 *                     type: string
 *                     format: date
 *                   cout_annuel:
 *                     type: number
 *                     format: float
 *       500:
 *         description: Erreur interne du serveur.
 */
router.get("/all", assuranceControllers_1.getAllAssurance);
exports.default = router;
