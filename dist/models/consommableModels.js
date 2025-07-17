"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
// Définition de la classe Consommable
class Consommable extends sequelize_1.Model {
}
// Initialisation du modèle Consommable et création dans la BDD
Consommable.init({
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
    type_consommable: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    date_achat: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    kilometrage_achat: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    quantite: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    cout: {
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
    observation: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
}, {
    sequelize: database_1.default,
    tableName: "consommables",
    timestamps: true,
});
exports.default = Consommable;
