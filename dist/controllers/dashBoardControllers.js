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
exports.vehiculeDetails = exports.vehiculesParUtilisateur = void 0;
const utilisateurModels_1 = __importDefault(require("../models/utilisateurModels"));
const vehiculeModels_1 = __importDefault(require("../models/vehiculeModels"));
const assuraneModels_1 = __importDefault(require("../models/assuraneModels"));
const controleTechniqueModels_1 = __importDefault(require("../models/controleTechniqueModels"));
const consommableModels_1 = __importDefault(require("../models/consommableModels"));
const entrerepModels_1 = __importDefault(require("../models/entrerepModels"));
//Liste des véhicules par utilisateur
// Définition de la relation entre les modèles
utilisateurModels_1.default.hasMany(vehiculeModels_1.default, { foreignKey: "utilisateur_id" });
vehiculeModels_1.default.belongsTo(utilisateurModels_1.default, { foreignKey: "utilisateur_id" });
// Contrôleur pour récupérer les véhicules classés par utilisateur
const vehiculesParUtilisateur = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const utilisateurs = yield utilisateurModels_1.default.findAll({
            include: [
                {
                    model: vehiculeModels_1.default,
                    required: false, // Permet d'afficher même les utilisateurs sans véhicules
                },
            ],
            order: [["nom", "ASC"]], // Classement des utilisateurs par nom
        });
        res.status(200).json(utilisateurs);
    }
    catch (error) {
        console.error("Erreur lors de la récupération des véhicules par utilisateur :", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
});
exports.vehiculesParUtilisateur = vehiculesParUtilisateur;
//Informations et historiques par véhicule
const vehiculeDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        console.log("===DEBUT=======", id);
        // Récupération des informations du véhicule avec toutes ses associations
        const vehicule = yield vehiculeModels_1.default.findByPk(id, {
            include: [
                {
                    model: assuraneModels_1.default,
                    as: "assurances",
                    attributes: ["id", "assureur", "numero_police", "type_assurance", "date_debut", "date_fin", "cout_annuel", "facture"]
                },
                {
                    model: controleTechniqueModels_1.default,
                    as: "controles",
                    attributes: ["id", "date_controle", "kilometrage_controle", "controleur", "resultat", "cout", "prochain_controle", "facture", "observation"]
                },
                {
                    model: consommableModels_1.default,
                    as: "consommables",
                    attributes: ["id", "type_consommable", "date_achat", "kilometrage_achat", "quantite", "cout", "facture", "observation"]
                },
                {
                    model: entrerepModels_1.default,
                    as: "entretiensReparations",
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
    }
    catch (error) {
        console.error("Erreur lors de la récupération des détails du véhicule:", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
});
exports.vehiculeDetails = vehiculeDetails;
//Liste des rappels "To Do"
