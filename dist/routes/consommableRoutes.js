"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const consommableControllers_1 = require("../controllers/consommableControllers");
const router = express_1.default.Router();
/**
 * @swagger
 * /c/create:
 *   post:
 *     summary: Créer un nouveau consommable
 *     description: Crée un nouveau consommable pour un véhicule, avec une vérification que le véhicule existe. Le champ `facture` permet de télécharger un fichier PDF, JPEG ou JPG de 1 Mo maximum.
 *     tags: [Consommables]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               vehicule_id:
 *                 type: integer
 *                 description: L'ID du véhicule associé
 *                 example: 2
 *               type_consommable:
 *                 type: string
 *                 description: Le type du consommable
 *                 example: "huile moteur"
 *               date_achat:
 *                 type: string
 *                 format: date
 *                 description: La date d'achat du consommable
 *                 example: "2025-03-21"
 *               kilometrage_achat:
 *                 type: integer
 *                 description: Le kilométrage du véhicule lors de l'achat
 *                 example: 15000
 *               quantite:
 *                 type: integer
 *                 description: La quantité de consommable acheté
 *                 example: 1
 *               cout:
 *                 type: number
 *                 format: float
 *                 description: Le coût du consommable
 *                 example: 49.99
 *               facture:
 *                 type: string
 *                 format: binary
 *                 description: Le fichier PDF, JPEG ou JPG de la facture (max 1 Mo)
 *               observation:
 *                 type: string
 *                 description: Observations sur le consommable
 *                 example: "A changé lors de la révision annuelle"
 *     responses:
 *       201:
 *         description: Consommable créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Consommable créé avec succès !"
 *       400:
 *         description: Erreur dans les données fournies
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erreur lors de la création du consommable."
 *       413:
 *         description: Fichier trop volumineux (supérieur à 1 Mo)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Le fichier de facture dépasse la taille maximale de 1 Mo."
 *       500:
 *         description: Erreur interne du serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erreur interne du serveur."
 */
router.post('/create', consommableControllers_1.createConsommable);
/**
 * @swagger
 * /c/update/{id}:
 *   put:
 *     summary: Mettre à jour un consommable
 *     description: Met à jour un consommable en utilisant son ID avec la possibilité de joindre une facture.
 *     tags: [Consommables]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: L'ID du consommable à mettre à jour
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               vehicule_id:
 *                 type: integer
 *                 description: L'ID du véhicule associé
 *                 example: 2
 *               type_consommable:
 *                 type: string
 *                 description: Le type du consommable
 *                 example: "huile moteur"
 *               date_achat:
 *                 type: string
 *                 format: date
 *                 description: La date d'achat du consommable
 *                 example: "2025-03-21"
 *               kilometrage_achat:
 *                 type: integer
 *                 description: Le kilométrage du véhicule lors de l'achat
 *                 example: 15000
 *               quantite:
 *                 type: integer
 *                 description: La quantité de consommable acheté
 *                 example: 1
 *               cout:
 *                 type: number
 *                 format: float
 *                 description: Le coût du consommable
 *                 example: 49.99
 *               facture:
 *                 type: string
 *                 format: binary
 *                 description: Le fichier de la facture (PDF, JPEG, JPG)
 *                 example: "facture.pdf"
 *               observation:
 *                 type: string
 *                 description: Observations sur le consommable
 *                 example: "A changé lors de la révision annuelle"
 *     responses:
 *       200:
 *         description: Consommable mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Consommable mis à jour avec succès !"
 *       400:
 *         description: Erreur dans les données fournies
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erreur lors de la mise à jour du consommable."
 *       404:
 *         description: Consommable non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Consommable introuvable avec l'ID fourni."
 *       500:
 *         description: Erreur interne du serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erreur interne du serveur."
 */
router.put('/update/:id', consommableControllers_1.updateConsommable);
/**
 * @swagger
 * /c/delete/{id}:
 *   delete:
 *     summary: Supprimer un consommable
 *     description: Supprime un consommable en utilisant son ID.
 *     tags: [Consommables]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: L'ID du consommable à supprimer
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Consommable supprimé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Consommable supprimé avec succès !"
 *       404:
 *         description: Consommable non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Consommable introuvable avec l'ID fourni."
 *       500:
 *         description: Erreur interne du serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erreur interne du serveur."
 */
router.delete('/delete/:id', consommableControllers_1.deleteConsommable);
/**
 * @swagger
 * /c/all:
 *   get:
 *     summary: Récupérer tous les consommables
 *     description: Récupère la liste de tous les consommables disponibles.
 *     tags: [Consommables]
 *     responses:
 *       200:
 *         description: Liste des consommables
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: L'ID du consommable
 *                     example: 1
 *                   vehicule_id:
 *                     type: integer
 *                     description: L'ID du véhicule associé
 *                     example: 2
 *                   type_consommable:
 *                     type: string
 *                     description: Le type du consommable
 *                     example: "huile moteur"
 *                   date_achat:
 *                     type: string
 *                     format: date
 *                     description: La date d'achat du consommable
 *                     example: "2025-03-21"
 *                   kilometrage_achat:
 *                     type: integer
 *                     description: Le kilométrage du véhicule lors de l'achat
 *                     example: 15000
 *                   quantite:
 *                     type: integer
 *                     description: La quantité de consommable acheté
 *                     example: 1
 *                   cout:
 *                     type: number
 *                     format: float
 *                     description: Le coût du consommable
 *                     example: 49.99
 *                   observation:
 *                     type: string
 *                     description: Observations sur le consommable
 *                     example: "A changé lors de la révision annuelle"
 *       500:
 *         description: Erreur interne du serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erreur interne du serveur."
 */
router.get('/all', consommableControllers_1.getAllConsommable);
exports.default = router;
