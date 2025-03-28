import { Request, Response } from "express";
import Consommable from "../models/consommableModels";
import Vehicule from "../models/vehiculeModels";

//===================================================
// ATTENTION : AJOUTER LES CONTROLES SUR LES CHAMPS
//===================================================

export async function createConsommable(req: Request, res: Response) {
    try {
        // Champs requis
        const { vehicule_id, type_consommable, date_achat, kilometrage_achat, quantite, cout, facture, observation } = req.body;

        // Vérification des champs obligatoires
            if (!vehicule_id) {
                res.status(400).json({ message: "Le champs Id du véhicule est obligatoire !" });
                return
            }

        // Vérification si le véhicule existe
        const vehicule = await Vehicule.findByPk(vehicule_id);
        if (!vehicule) {
            res.status(404).json({ message: "Véhicule non trouvé. Veuillez vérifier l'Id du véhicule !" });
            return
        }

        // Création d'un nouveau consommable
        const newconsommable = await Consommable.create({
            vehicule_id,
            type_consommable,
            date_achat,
            kilometrage_achat,
            quantite,
            cout,
            facture,
            observation                    
        });

        const consommableResponse = newconsommable;
        res.status(200).json({message:'Consommable créé avec succès !', consommableResponse});
             
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

export async function updateConsommable (req: Request, res: Response) {
    const { id } = req.params;
    const { vehicule_id, type_consommable, date_achat, kilometrage_achat, quantite, cout, facture, observation } = req.body;

    try {
        const consommable = await Consommable.findByPk(id);
        if (!consommable) {
            res.status(404).json({ message: "Consommable non trouvé !" });
            return 
        }
        
        await consommable.update({ vehicule_id, type_consommable, date_achat, kilometrage_achat, quantite, cout, facture, observation });
        res.status(200).json({ message: "Consommable mis à jour avec succès !" });
        
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
}

export async function deleteConsommable(req: Request, res: Response) {
    const { id } = req.params;

    try {
        const consommable = await Consommable.findOne({ where: { id } });
        if (!consommable) {
            res.status(404).json({ message: "Consommable non trouvé !" });
            return 
        }

        await consommable.destroy();
        res.status(200).json({ message: "Consommable supprimé avec succès !" });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
}

export const getAllConsommable = async (req: Request, res: Response) => {
    try {
      const consommables = await Consommable.findAll(); // Exemple avec Sequelize
      res.status(200).json(consommables);
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur", error });
    }
  };
