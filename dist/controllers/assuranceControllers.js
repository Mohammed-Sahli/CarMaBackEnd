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
exports.getAllAssurance = void 0;
exports.createAssurance = createAssurance;
exports.updateAssurance = updateAssurance;
exports.deleteAssurance = deleteAssurance;
const assuraneModels_1 = __importDefault(require("../models/assuraneModels"));
const vehiculeModels_1 = __importDefault(require("../models/vehiculeModels"));
//===================================================
// ATTENTION : AJOUTER LES CONTRÔLES SUR LES CHAMPS
//===================================================
function createAssurance(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Champs requis
            const { vehicule_id, assureur, numero_police, type_assurance, date_debut, date_fin, cout_annuel, facture } = req.body;
            // Vérification des champs obligatoires
            if (!vehicule_id || !numero_police) {
                res.status(400).json({ message: "Les champs Id du véhicule et le numéro de police sont obligatoires !" });
                return;
            }
            // Vérification si le véhicule existe
            const vehicule = yield vehiculeModels_1.default.findByPk(vehicule_id);
            if (!vehicule) {
                res.status(404).json({ message: "Véhicule non trouvé. Veuillez vérifier l'Id du véhicule !" });
                return;
            }
            // Création d'un nouveau contrat d'assurance
            const newAssurance = yield assuraneModels_1.default.create({
                vehicule_id,
                assureur,
                numero_police,
                type_assurance,
                date_debut,
                date_fin,
                cout_annuel,
                facture
            });
            res.status(200).json({
                message: "Contrat d'assurance créé avec succès !",
                assurance: newAssurance,
            });
        }
        catch (err) {
            console.log(err.message);
            if (err.name === "SequelizeUniqueConstraintError") {
                res.status(400).json({ message: "Erreur : Données en double détectées !" });
                return;
            }
            console.error("Erreur lors de l'ajout :", err);
            res.status(500).json({ message: "Erreur interne du serveur." });
        }
    });
}
function updateAssurance(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const { vehicule_id, assureur, numero_police, type_assurance, date_debut, date_fin, cout_annuel } = req.body;
        try {
            const assurance = yield assuraneModels_1.default.findByPk(id);
            if (!assurance) {
                res.status(404).json({ message: "Contrat d'assurance non trouvé !" });
                return;
            }
            yield assurance.update({ vehicule_id, assureur, numero_police, type_assurance, date_debut, date_fin, cout_annuel });
            res.status(200).json({ message: "Contrat d'assurance mis à jour avec succès !" });
        }
        catch (error) {
            res.status(500).json({ message: "Erreur serveur", error });
        }
    });
}
function deleteAssurance(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const assurance = yield assuraneModels_1.default.findOne({ where: { id } });
            if (!assurance) {
                res.status(404).json({ message: "Contrat d'assurance non trouvé !" });
                return;
            }
            yield assurance.destroy();
            res.status(200).json({ message: "Contrat d'assurance supprimé avec succès !" });
        }
        catch (error) {
            res.status(500).json({ message: "Erreur serveur", error });
        }
    });
}
const getAllAssurance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const assurances = yield assuraneModels_1.default.findAll();
        res.status(200).json(assurances);
    }
    catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
});
exports.getAllAssurance = getAllAssurance;
