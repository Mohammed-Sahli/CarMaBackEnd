"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database")); // Adjust the path to your database configuration file
// Définition de la classe Véhicule
class Vehicule extends sequelize_1.Model {
}
// Initialisation du modèle Véhicule et création dans la BDD
Vehicule.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    utilisateur_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'utilisateurs',
            key: 'id',
        },
    },
    immat: {
        type: sequelize_1.DataTypes.STRING(10),
        allowNull: false,
        unique: true,
    },
    numero_chassis: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
        unique: true,
    },
    marque: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    modele: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: true,
    },
    carburant: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    dmec: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    date_achat: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    prix_achat: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00,
        validate: { min: 0.00 },
    },
    kilometrage_achat: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: { min: 0 },
    },
    dernier_kilometrage: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
        validate: {
            isGreaterThanKilometrageAchat(value) {
                if (value < this.kilometrage_achat && value) {
                    throw new Error("Ce kilométrage doit être supérieur à celui de l'achat !");
                }
            }
        },
    },
}, {
    sequelize: database_1.default,
    tableName: "vehicules",
    timestamps: true,
    hooks: {
        beforeCreate: (vehicule) => {
            vehicule.dernier_kilometrage = vehicule.kilometrage_achat;
        }
    }
});
exports.default = Vehicule;
