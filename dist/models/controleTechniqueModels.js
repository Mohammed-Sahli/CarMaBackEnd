"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database")); // Adjust the path to your database configuration file
// Définition de la classe Controle Technique
class Controle extends sequelize_1.Model {
}
// Initialisation du modèle Controle Technique et création dans la BDD
Controle.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    vehicule_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'vehicules',
            key: 'id',
        },
    },
    date_controle: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    kilometrage_controle: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    controleur: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    resultat: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    cout: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00,
        validate: { min: 0.00 },
    },
    prochain_controle: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
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
    observation: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true,
    },
}, {
    sequelize: database_1.default,
    tableName: "controles",
    timestamps: true,
});
exports.default = Controle;
