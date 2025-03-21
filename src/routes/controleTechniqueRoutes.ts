import express from 'express';
import { createControle, updateControle, deleteControle, getAllControle } from '../controllers/controleTechniqueControllers';   

const router = express.Router();

/**
 * @swagger
 * /ct/create:
 *   post:
 *     summary: Créer un nouveau contrôle technique
 *     description: Crée un nouveau contrôle technique pour un véhicule.
 *     tags: [Contrôles Techniques]
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
 *                 example: 2
 *               date_controle:
 *                 type: string
 *                 format: date
 *                 description: Date du contrôle
 *                 example: "2025-03-21"
 *               kilometrage_controle:
 *                 type: integer
 *                 description: Kilométrage lors du contrôle
 *                 example: 25000
 *               controleur:
 *                 type: string
 *                 description: Nom du contrôleur
 *                 example: "Jean Dupont"
 *               resultat:
 *                 type: string
 *                 description: Résultat du contrôle
 *                 example: "Réussi"
 *               cout:
 *                 type: number
 *                 format: float
 *                 description: Coût du contrôle
 *                 example: 120.50
 *               prochain_controle:
 *                 type: string
 *                 format: date
 *                 description: Date du prochain contrôle
 *                 example: "2026-03-21"
 *               observation:
 *                 type: string
 *                 description: Observations supplémentaires
 *                 example: "Contrôle effectué sans défaut"
 *     responses:
 *       200:
 *         description: Contrôle technique créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Contrôle technique créé avec succès !"
 *       400:
 *         description: Erreur dans les données fournies
 *       500:
 *         description: Erreur serveur
 */
router.post('/create', createControle);

/**
 * @swagger
 * /ct/update/{id}:
 *   put:
 *     summary: Mettre à jour un contrôle technique
 *     description: Met à jour un contrôle technique existant en utilisant son ID.
 *     tags: [Contrôles Techniques]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID du contrôle à mettre à jour
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               vehicule_id:
 *                 type: integer
 *                 example: 2
 *               date_controle:
 *                 type: string
 *                 example: "2025-03-21"
 *               kilometrage_controle:
 *                 type: integer
 *                 example: 25000
 *               controleur:
 *                 type: string
 *                 example: "Jean Dupont"
 *               resultat:
 *                 type: string
 *                 example: "Réussi"
 *               cout:
 *                 type: number
 *                 format: float
 *                 example: 120.50
 *               prochain_controle:
 *                 type: string
 *                 format: date
 *                 example: "2026-03-21"
 *               observation:
 *                 type: string
 *                 example: "Contrôle effectué sans défaut"
 *     responses:
 *       200:
 *         description: Contrôle technique mis à jour avec succès
 *       404:
 *         description: Contrôle technique non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.put('/update/:id', updateControle);

/**
 * @swagger
 * /ct/delete/{id}:
 *   delete:
 *     summary: Supprimer un contrôle technique
 *     description: Supprime un contrôle technique en utilisant son ID.
 *     tags: [Contrôles Techniques]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID du contrôle à supprimer
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Contrôle technique supprimé avec succès
 *       404:
 *         description: Contrôle technique non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.delete('/delete/:id', deleteControle);

/**
 * @swagger
 * /ct/all:
 *   get:
 *     summary: Récupérer tous les contrôles techniques
 *     description: Récupère la liste de tous les contrôles techniques effectués.
 *     tags: [Contrôles Techniques]
 *     responses:
 *       200:
 *         description: Liste des contrôles techniques
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   vehicule_id:
 *                     type: integer
 *                     example: 2
 *                   date_controle:
 *                     type: string
 *                     example: "2025-03-21"
 *                   kilometrage_controle:
 *                     type: integer
 *                     example: 25000
 *                   controleur:
 *                     type: string
 *                     example: "Jean Dupont"
 *                   resultat:
 *                     type: string
 *                     example: "Réussi"
 *                   cout:
 *                     type: number
 *                     format: float
 *                     example: 120.50
 *                   prochain_controle:
 *                     type: string
 *                     example: "2026-03-21"
 *                   observation:
 *                     type: string
 *                     example: "Contrôle effectué sans défaut"
 *       500:
 *         description: Erreur serveur
 */
router.get('/all', getAllControle);

export default router;