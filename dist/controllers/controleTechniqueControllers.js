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
exports.getAllControle = void 0;
exports.createControle = createControle;
exports.updateControle = updateControle;
exports.deleteControle = deleteControle;
const controleTechniqueModels_1 = __importDefault(require("../models/controleTechniqueModels"));
const vehiculeModels_1 = __importDefault(require("../models/vehiculeModels"));
//===================================================
// ATTENTION : AJOUTER LES CONTROLES SUR LES CHAMPS
//===================================================
function createControle(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Champs requis
            const { vehicule_id, date_controle, kilometrage_controle, controleur, resultat, cout, prochain_controle, observation } = req.body;
            // Vérification des champs obligatoires
            if (!vehicule_id) {
                res.status(400).json({ message: "Le champs Id du véhicule est obligatoire !" });
                return;
            }
            // Vérification si le véhicule existe
            const vehicule = yield vehiculeModels_1.default.findByPk(vehicule_id);
            if (!vehicule) {
                res.status(404).json({ message: "Véhicule non trouvé. Veuillez vérifier l'Id du véhicule !" });
                return;
            }
            // Création d'un nouveau contrôle technique
            const newControle = yield controleTechniqueModels_1.default.create({
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
            res.status(200).json({ message: 'Contrôle technique créé avec succès !', controleResponse });
        }
        catch (err) {
            console.log(err.message);
            if (err.name === "SequelizeUniqueConstraintError") {
                res.status(400).json({ message: "Erreur Erreur Erreur !!!" });
                return;
            }
            console.error("Erreur lors de l'ajout :", err);
            res.status(500).json({ message: "Erreur interne du serveur." });
        }
    });
}
function updateControle(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const { vehicule_id, date_controle, kilometrage_controle, controleur, resultat, cout, prochain_controle, observation } = req.body;
        try {
            const controle = yield controleTechniqueModels_1.default.findByPk(id);
            if (!controle) {
                res.status(404).json({ message: "Contrôle technique non trouvé !" });
                return;
            }
            yield controle.update({ vehicule_id, date_controle, kilometrage_controle, controleur, resultat, cout, prochain_controle, observation });
            res.status(200).json({ message: "Contrôle technique mis à jour avec succès !" });
        }
        catch (error) {
            res.status(500).json({ message: "Erreur serveur", error });
        }
    });
}
function deleteControle(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const controle = yield controleTechniqueModels_1.default.findOne({ where: { id } });
            if (!controle) {
                res.status(404).json({ message: "Contrôle technique non trouvé !" });
                return;
            }
            yield controle.destroy();
            res.status(200).json({ message: "Contrôle technique supprimé avec succès !" });
        }
        catch (error) {
            res.status(500).json({ message: "Erreur serveur", error });
        }
    });
}
const getAllControle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const controles = yield controleTechniqueModels_1.default.findAll(); // Exemple avec Sequelize
        res.status(200).json(controles);
    }
    catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
});
exports.getAllControle = getAllControle;
