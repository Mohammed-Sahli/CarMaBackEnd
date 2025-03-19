import Entrerep from "../models/entrerepModels";
import { Request, Response } from "express";

//===================================================
// ATTENTION : AJOUTER LES CONTROLES SUR LES CHAMPS
//===================================================

export async function createEntrerep(req: Request, res: Response) {
    try {
        // Champs requis
        const { vehicule_id, type_entrerep, date_entrerep, garage, cout, kilometrage, observation } = req.body;

        // Vérification des champs obligatoires
            if (!vehicule_id) {
                res.status(400).json({ message: "Le champs Id du véhicule est obligatoire !" });
                return
            }

        // Création d'un nouveau véhicule en Sequelize
        const newEntrerep = await Entrerep.create({
            vehicule_id,
            type_entrerep,
            date_entrerep,
            garage,
            cout,
            kilometrage,
            observation 
        });

        const entrerepResponse = newEntrerep;
        res.status(200).json({message:'L\'entretien/réparation créé avec succès !', entrerepResponse});
             
        } catch (err: any) {
            console.log(err.message);
            if (err.name === "SequelizeUniqueConstraintError") {
                 res.status(400).json({ message: "Erreur Erreur Erreur !!!" });
                return
            }
        console.error("Erreur lors de l'ajout :", err);
        res.status(500).json({ message: "Erreur interne du serveur." });
    }
}

export async function updateEntrerep(req: Request, res: Response) {
    const { id } = req.params;
    const { vehicule_id, type_entrerep, date_entrerep, garage, cout, kilometrage, observation } = req.body;

    try {
        const entrerep = await Entrerep.findByPk(id);
        if (!entrerep) {
            res.status(404).json({ message: "Entretien/Réparation non trouvé !" });
            return 
        }
        
        await entrerep.update({ vehicule_id, type_entrerep, date_entrerep, garage, cout, kilometrage, observation });
        res.status(200).json({ message: "Entretien/Réparation mis à jour avec succès !" });

    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
}

export async function deleteEntrerep(req: Request, res: Response) {
    const { id } = req.params;

    try {
        const entrerep = await Entrerep.findOne({ where: { id } });
        if (!entrerep) {
            res.status(404).json({ message: "Entretein/Réparation non trouvé !" });
            return 
        }

        await entrerep.destroy();
        res.status(200).json({ message: "Entretien/Réparation supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
}

export const getAllEntrerep = async (req: Request, res: Response) => {
    try {
      const entrereps = await Entrerep.findAll(); // Exemple avec Sequelize
      res.status(200).json(entrereps);
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur", error });
    }
  };
