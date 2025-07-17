import { Request, Response } from "express";
import Vehicule from "../models/vehiculeModels";
import Utilisateur from "../models/utilisateurModels";
import { Op } from "sequelize";

// 🔧 Fonction utilitaire pour parser une date en toute sécurité
function parseDate(input: any): Date | null {
  if (!input) return null;
  const parsed = new Date(input);
  return isNaN(parsed.getTime()) ? null : parsed;
}

// =======================================================
// 🚗 Créer un véhicule
// =======================================================
export async function createVehicule(req: Request, res: Response) {
  try {
    const {
      immat,
      numero_chassis,
      utilisateur_id,
      marque,
      modele,
      carburant,
      dmec,
      date_achat,
      prix_achat,
      kilometrage_achat,
    } = req.body;

    if (!immat || !numero_chassis || !utilisateur_id) {
      return res.status(400).json({
        message: "Les champs immatriculation, numéro de châssis et utilisateur_id sont obligatoires.",
      });
    }

    // Vérifie si l'utilisateur existe
    const utilisateur = await Utilisateur.findByPk(utilisateur_id);
    if (!utilisateur) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    const vehicule = await Vehicule.create({
      immat,
      numero_chassis,
      utilisateur_id,
      marque,
      modele,
      carburant,
      dmec: parseDate(dmec),
      date_achat: parseDate(date_achat),
      prix_achat: prix_achat ?? 0,
      kilometrage_achat: kilometrage_achat ?? 0,
    });

    res.status(201).json(vehicule);
  } catch (err: any) {
    console.error("Erreur lors de la création du véhicule :", err.message);
    if (err.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({ message: "Immatriculation ou numéro de châssis déjà existant." });
    }
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
}

// =======================================================
// 🛠️ Modifier un véhicule
// =======================================================
export async function updateVehicule(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const vehicule = await Vehicule.findByPk(id);
    if (!vehicule) {
      return res.status(404).json({ message: "Véhicule non trouvé." });
    }

    const {
      immat,
      numero_chassis,
      utilisateur_id,
      marque,
      modele,
      carburant,
      dmec,
      date_achat,
      prix_achat,
      kilometrage_achat,
    } = req.body;

    // Si l'utilisateur change, vérifier qu'il existe
    if (utilisateur_id && utilisateur_id !== vehicule.utilisateur_id) {
      const utilisateur = await Utilisateur.findByPk(utilisateur_id);
      if (!utilisateur) {
        return res.status(404).json({ message: "Nouvel utilisateur non trouvé." });
      }
    }

    await vehicule.update({
      immat: immat ?? vehicule.immat,
      numero_chassis: numero_chassis ?? vehicule.numero_chassis,
      utilisateur_id: utilisateur_id ?? vehicule.utilisateur_id,
      marque: marque ?? vehicule.marque,
      modele: modele ?? vehicule.modele,
      carburant: carburant ?? vehicule.carburant,
      dmec: parseDate(dmec) ?? vehicule.dmec,
      date_achat: parseDate(date_achat) ?? vehicule.date_achat,
      prix_achat: prix_achat ?? vehicule.prix_achat,
      kilometrage_achat: kilometrage_achat ?? vehicule.kilometrage_achat,
    });

    res.status(200).json({
      message: "Véhicule mis à jour avec succès.",
      vehicule,
    });
  } catch (err: any) {
    console.error("Erreur lors de la mise à jour :", err.message);
    if (err.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({ message: "Immatriculation ou numéro de châssis déjà existant." });
    }
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
}

// =======================================================
// ❌ Supprimer un véhicule
// =======================================================
export async function deleteVehicule(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const vehicule = await Vehicule.findByPk(id);
    if (!vehicule) {
      return res.status(404).json({ message: "Véhicule non trouvé." });
    }

    await vehicule.destroy();
    res.status(200).json({ message: "Véhicule supprimé avec succès." });
  } catch (err: any) {
    console.error("Erreur lors de la suppression :", err.message);
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
}

// =======================================================
// 📋 Liste des véhicules avec utilisateur associé
// =======================================================
export async function getAllVehicule(req: Request, res: Response) {
  try {
    const vehicules = await Vehicule.findAll({
      include: [
        {
          model: Utilisateur,
          attributes: ["id", "nom", "prenom"],
          as: "utilisateur",
        },
      ],
      order: [["immat", "ASC"]],
    });

    res.status(200).json(vehicules);
  } catch (err: any) {
    console.error("Erreur lors de la récupération des véhicules :", err.message);
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
}
