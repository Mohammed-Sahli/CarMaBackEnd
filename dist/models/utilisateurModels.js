"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database")); // Adjust the path to your database configuration file
// Définition de la classe Utilisateur
class Utilisateur extends sequelize_1.Model {
}
// Initialisation du modèle Utilisateur et création dans la BDD
Utilisateur.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nom: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    prenom: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    role: {
        type: sequelize_1.DataTypes.STRING(10),
        allowNull: false,
        defaultValue: "user",
    },
    email: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
        unique: true,
    },
    telephone: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: true,
    },
    mot_de_passe: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    date_inscription: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    sequelize: database_1.default,
    tableName: "utilisateurs",
    timestamps: true,
});
exports.default = Utilisateur;
