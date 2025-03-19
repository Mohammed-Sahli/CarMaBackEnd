import Vehicule from "../models/vehiculeModels";
import { Request, Response } from "express";

//===================================================
// ATTENTION : AJOUTER LES CONTROLES SUR LES CHAMPS
//===================================================

export async function createVehicule(req: Request, res: Response) {
    try {
        // Champs requis
        const { immat, numero_chassis, utilisateur_id, marque, modele, carburant, dmec, date_achat, prix_achat, kilometrage_achat } = req.body;

        // Vérification des champs obligatoires
            if (!immat || !numero_chassis || !utilisateur_id) {
                res.status(400).json({ message: "Les champs immatriculation, numero_chassis et utilisateur_id sont obligatoires !" });
                return
            }

        // Création d'un nouveau véhicule en Sequelize
        const newVehicule = await Vehicule.create({
            immat,
            numero_chassis,
            utilisateur_id,
            marque,
            modele,
            carburant,
            dmec,
            date_achat,
            prix_achat,
            kilometrage_achat
        });

        const vehiculeResponse = newVehicule;
        res.status(200).json({message:'Véhicule créé avec succès !', vehiculeResponse});
             
        } catch (err: any) {
            console.log(err.message);
            //Gestion des erreurs (cas d'immatriculation ou numéro de chassis déjà existant)
            if (err.name === "SequelizeUniqueConstraintError") {
                 res.status(400).json({ message: "immatriculation ou numéro_chassis déjà existant." });
                return
            }
        console.error("Erreur lors de l'ajout :", err);
        res.status(500).json({ message: "Erreur interne du serveur." });
    }
}

export async function updateVehicule(req: Request, res: Response) {
    const { id } = req.params;
    const { utilisateur_id, date_achat, prix_achat, kilometrage_achat } = req.body;

    try {
        const vehicule = await Vehicule.findByPk(id);
        if (!vehicule) {
            res.status(404).json({ message: "Véhicule non trouvé !" });
            return 
        }
        
        await vehicule.update({ utilisateur_id, date_achat, prix_achat, kilometrage_achat });

        res.status(200).json({ message: "Véhicule mis à jour avec succès !" });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
}

export async function deleteVehicule(req: Request, res: Response) {
    const { id } = req.params;

    try {
        const vehicule = await Vehicule.findOne({ where: { id } });
        if (!vehicule) {
            res.status(404).json({ message: "Véhicule non trouvé !" });
            return 
        }

        await vehicule.destroy();
        res.status(200).json({ message: "Véhicule supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
}

export const getAllVehicule = async (req: Request, res: Response) => {
    try {
      const vehicules = await Vehicule.findAll(); // Exemple avec Sequelize
      res.status(200).json(vehicules);
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur", error });
    }
  };
