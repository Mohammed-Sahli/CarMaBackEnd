import { Request, Response } from "express";
import Utilisateur from "../models/utilisateurModels";
import Vehicule from "../models/vehiculeModels";
import Assurance from "../models/assuranceModels";
import Controle from "../models/controleTechniqueModels";   
import Consommable from "../models/consommableModels";
import Entrerep from "../models/entrerepModels";

// Contrôleur pour récupérer les véhicules classés par utilisateur
export const vehiculesParUtilisateur = async (req: Request, res: Response) => {
    try {
        const utilisateurs = await Utilisateur.findAll({
            include: [
                {
                    model: Vehicule,
                    as: "vehicules",
                    required: false, // Permet d'afficher même les utilisateurs sans véhicules
                },
            ],
            order: [["nom", "ASC"]], // Classement des utilisateurs par nom
        });

        res.status(200).json(utilisateurs);
    } catch (error) {
        console.error("Erreur lors de la récupération des véhicules par utilisateur :", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};

// Informations et historiques par véhicule
export const vehiculeDetails = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        console.log("===DEBUT=======", id)
        // Récupération des informations du véhicule avec toutes ses associations
        const vehicule = await Vehicule.findByPk(id, {
            include: [
                {
                    model: Assurance,
                    as: "assurances",
                    attributes: ["id", "assureur", "numero_police", "type_assurance", "date_debut", "date_fin", "cout_annuel", "facture"]
                },
                {
                    model: Controle,
                    as: "controleTechniques",
                    attributes: ["id", "date_controle", "kilometrage_controle", "controleur", "resultat", "cout", "prochain_controle", "facture", "observation"]
                },
                {
                    model: Consommable,
                    as: "consommables",
                    attributes: ["id", "type_consommable", "date_achat", "kilometrage_achat", "quantite", "cout", "facture", "observation"]
                },
                {
                    model: Entrerep,
                    as: "entretienReparations",
                    attributes: ["id", "type_entrerep", "date_entrerep", "garage", "cout", "kilometrage", "facture", "observation"]
                }
            ]
        });
        console.log("===FIN=======", id);
        if (!vehicule) {
            res.status(404).json({ message: "Véhicule non trouvé" });
            return;
        }

        res.status(200).json(vehicule);
    } catch (error) {
        console.error("Erreur lors de la récupération des détails du véhicule:", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};
