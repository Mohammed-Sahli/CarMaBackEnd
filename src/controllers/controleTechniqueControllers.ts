import { Request, Response } from "express";
import Controle from "../models/controleTechniqueModels";

//===================================================
// ATTENTION : AJOUTER LES CONTROLES SUR LES CHAMPS
//===================================================

export async function createControle(req: Request, res: Response) {
    try {
        // Champs requis
        const { vehicule_id, date_controle, kilometrage_controle, controleur, resultat, cout, prochain_controle, observation } = req.body;

        // Vérification des champs obligatoires
            if (!vehicule_id ) {
                res.status(400).json({ message: "Le champs Id du véhicule est obligatoire !" });
                return
            }

        // Création d'un nouveau contrôle technique
        const newControle = await Controle.create({
            vehicule_id,
            date_controle,
            kilometrage_controle,
            controleur,
            resultat,
            cout,
            prochain_controle,
            observation        
        });

        const controleResponse = newControle;
        res.status(200).json({message:'Contrôle technique créé avec succès !', controleResponse});
             
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

export async function updateControle (req: Request, res: Response) {
    const { id } = req.params;
    const { vehicule_id, date_controle, kilometrage_controle, controleur, resultat, cout, prochain_controle, observation  } = req.body;

    try {
        const controle = await Controle.findByPk(id);
        if (!controle) {
            res.status(404).json({ message: "Contrôle technique non trouvé !" });
            return 
        }
        
        await controle.update({ vehicule_id, date_controle, kilometrage_controle, controleur, resultat, cout, prochain_controle, observation });
        res.status(200).json({ message: "Contrôle technique mis à jour avec succès !" });   
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
}

export async function deleteControle(req: Request, res: Response) {
    const { id } = req.params;

    try {
        const controle = await Controle.findOne({ where: { id } });
        if (!controle) {
            res.status(404).json({ message: "Contrôle technique non trouvé !" });
            return 
        }

        await controle.destroy();
        res.status(200).json({ message: "Contrôle technique supprimé avec succès !" });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
}

export const getAllControle = async (req: Request, res: Response) => {
    try {
      const controles = await Controle.findAll(); // Exemple avec Sequelize
      res.status(200).json(controles);
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur", error });
    }
  };
