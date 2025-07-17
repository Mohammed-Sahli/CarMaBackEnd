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
exports.getAllEntrerep = void 0;
exports.createEntrerep = createEntrerep;
exports.updateEntrerep = updateEntrerep;
exports.deleteEntrerep = deleteEntrerep;
const entrerepModels_1 = __importDefault(require("../models/entrerepModels"));
const vehiculeModels_1 = __importDefault(require("../models/vehiculeModels"));
//===================================================
// ATTENTION : AJOUTER LES CONTROLES SUR LES CHAMPS
//===================================================
function createEntrerep(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Champs requis
            const { vehicule_id, type_entrerep, date_entrerep, garage, cout, kilometrage, observation } = req.body;
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
            // Création d'un nouveau véhicule en Sequelize
            const newEntrerep = yield entrerepModels_1.default.create({
                vehicule_id,
                type_entrerep,
                date_entrerep,
                garage,
                cout,
                kilometrage,
                observation
            });
            const entrerepResponse = newEntrerep;
            res.status(200).json({ message: 'Entretien / réparation créé avec succès !', entrerepResponse });
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
function updateEntrerep(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const { vehicule_id, type_entrerep, date_entrerep, garage, cout, kilometrage, observation } = req.body;
        try {
            const entrerep = yield entrerepModels_1.default.findByPk(id);
            if (!entrerep) {
                res.status(404).json({ message: "Entretien/Réparation non trouvé !" });
                return;
            }
            console.log("=================================");
            yield entrerep.update({ vehicule_id, type_entrerep, date_entrerep, garage, cout, kilometrage, observation });
            res.status(200).json({ message: "Entretien/Réparation mis à jour avec succès !" });
        }
        catch (error) {
            res.status(500).json({ message: "Erreur serveur", error });
        }
    });
}
function deleteEntrerep(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const entrerep = yield entrerepModels_1.default.findByPk(id);
            if (!entrerep) {
                res.status(404).json({ message: "Entretein/Réparation non trouvé !" });
                return;
            }
            yield entrerep.destroy();
            res.status(200).json({ message: "Entretien/Réparation supprimé avec succès" });
        }
        catch (error) {
            res.status(500).json({ message: "Erreur serveur", error });
        }
    });
}
const getAllEntrerep = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const entrereps = yield entrerepModels_1.default.findAll(); // Exemple avec Sequelize
        res.status(200).json(entrereps);
    }
    catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
});
exports.getAllEntrerep = getAllEntrerep;
