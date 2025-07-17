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
exports.Entrerep = exports.Consommable = exports.Controle = exports.Assurance = exports.Vehicule = exports.Utilisateur = exports.syncDatabase = void 0;
const database_1 = __importDefault(require("../config/database"));
const assuraneModels_1 = __importDefault(require("./assuraneModels"));
exports.Assurance = assuraneModels_1.default;
const consommableModels_1 = __importDefault(require("./consommableModels"));
exports.Consommable = consommableModels_1.default;
const controleTechniqueModels_1 = __importDefault(require("./controleTechniqueModels"));
exports.Controle = controleTechniqueModels_1.default;
const entrerepModels_1 = __importDefault(require("./entrerepModels"));
exports.Entrerep = entrerepModels_1.default;
const utilisateurModels_1 = __importDefault(require("./utilisateurModels"));
exports.Utilisateur = utilisateurModels_1.default;
const vehiculeModels_1 = __importDefault(require("./vehiculeModels"));
exports.Vehicule = vehiculeModels_1.default;
const syncDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //alter: true Met à jour la structure automatiquement la structure de la base de données
        //à utiliser sans options pour utiliser les migrations en production.
        yield database_1.default.sync({ alter: true });
        console.log("Base de données synchronisée");
    }
    catch (error) {
        console.error("Erreur lors de la synchronisation :", error);
    }
});
exports.syncDatabase = syncDatabase;
