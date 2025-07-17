"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database")); // Adjust the path to your database configuration file
// Définition de la classe Assurance
class Assurance extends sequelize_1.Model {
}
// Initialisation du modèle Assurance et création dans la BDD
Assurance.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    vehicule_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'vehicules',
            key: 'id',
        },
    },
    assureur: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    numero_police: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
        unique: true,
    },
    type_assurance: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    date_debut: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    date_fin: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    cout_annuel: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00,
        validate: { min: 0.00 },
    },
    facture: {
        type: sequelize_1.DataTypes.BLOB("long"), // Stocke les fichiers binaires
        allowNull: true,
        validate: {
            fileSizeLimit(value) {
                if (value && value.length > 1048576) { // 1 Mo
                    throw new Error("Le fichier PDF ne doit pas dépasser 1 Mo.");
                }
            },
        },
    },
}, {
    sequelize: database_1.default,
    tableName: "assurances",
    timestamps: true,
});
exports.default = Assurance;
