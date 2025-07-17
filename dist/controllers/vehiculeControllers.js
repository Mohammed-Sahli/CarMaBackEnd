"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllVehicule = void 0;
exports.createVehicule = createVehicule;
exports.updateVehicule = updateVehicule;
exports.deleteVehicule = deleteVehicule;
const vehiculeModels_1 = __importDefault(require("../models/vehiculeModels"));
//===================================================
// ATTENTION : AJOUTER LES CONTROLES SUR LES CHAMPS
//===================================================
function createVehicule(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Champs requis
            const { immat, numero_chassis, utilisateur_id, marque, modele, carburant, dmec, date_achat, prix_achat, kilometrage_achat } = req.body;
            // Vérification des champs obligatoires
            if (!immat || !numero_chassis || !utilisateur_id) {
                res.status(400).json({ message: "Les champs immatriculation, numero_chassis et utilisateur_id sont obligatoires !" });
                return;
            }
            // ==================================================================================
            //  Ajouter controle sur l'existence de l'utilisateur_id dans la table utilisateur
            // ==================================================================================
            // Création d'un nouveau véhicule en Sequelize
            const newVehicule = yield vehiculeModels_1.default.create({
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
            res.status(200).json({ message: 'Véhicule créé avec succès !', vehiculeResponse });
        }
        catch (err) {
            console.log(err.message);
            //Gestion des erreurs (cas d'immatriculation ou numéro de chassis déjà existant)
            if (err.name === "SequelizeUniqueConstraintError") {
                res.status(400).json({ message: "immatriculation ou numéro_chassis déjà existant." });
                return;
            }
            console.error("Erreur lors de l'ajout :", err);
            res.status(500).json({ message: "Erreur interne du serveur." });
        }
    });
}
function updateVehicule(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const { utilisateur_id, date_achat, prix_achat, kilometrage_achat } = req.body;
        try {
            const vehicule = yield vehiculeModels_1.default.findByPk(id);
            if (!vehicule) {
                res.status(404).json({ message: "Véhicule non trouvé !" });
                return;
            }
            yield vehicule.update({ utilisateur_id, date_achat, prix_achat, kilometrage_achat });
            res.status(200).json({ message: "Véhicule mis à jour avec succès !" });
        }
        catch (error) {
            res.status(500).json({ message: "Erreur serveur", error });
        }
    });
}
function deleteVehicule(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const vehicule = yield vehiculeModels_1.default.findByPk(id);
            if (!vehicule) {
                res.status(404).json({ message: "Véhicule non trouvé !" });
                return;
            }
            yield vehicule.destroy();
            res.status(200).json({ message: "Véhicule supprimé avec succès" });
        }
        catch (error) {
            res.status(500).json({ message: "Erreur serveur", error });
        }
    });
}
const getAllVehicule = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vehicules = yield vehiculeModels_1.default.findAll(); // Exemple avec Sequelize
        res.status(200).json(vehicules);
    }
    catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
});
exports.getAllVehicule = getAllVehicule;
