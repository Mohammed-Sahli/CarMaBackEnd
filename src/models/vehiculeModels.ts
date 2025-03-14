import { Sequelize, DataTypes, Model } from "sequelize";
import sequelize from "../config/database"; // Adjust the path to your database configuration file


// Définition des attributs d'un Véhicule
interface VehiculeAttributes {
    id?: number;
    immat?: string;
    numero_chassis?: string;
    marque?: string;
    modele?: string;
    carburant?: string;
    dmec?: Date;
    date_achat?: Date;
    prix_achat?: number;
    kilometrage_achat?: number;
    dernier_kilometrage?: number;
    utilisateur_id?: number;
    }

// Définition de la classe Véhicule
class Vehicule extends Model<VehiculeAttributes> implements VehiculeAttributes {
    public id!: number;
    public immat!: string;
    public marque!: string;
    public modele!: string;
    public carburant!: string;
    public dmec!: Date;
    public date_achat!: Date;
    public prix_achat!: number;
    public kilometrage_achat!: number;
    public dernier_kilometrage!: number;
    public readonly date_inscription!: Date;
}

// Initialisation du modèle Véhicule et création dans la BDD
Vehicule.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        utilisateur_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'utilisateurs',
                key: 'id',
            }, 
        },
        immat: {
            type: DataTypes.STRING(10),
            allowNull: false,
            unique: true,
        },
        numero_chassis: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },
        marque: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        modele: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        carburant: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        dmec: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        date_achat: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        prix_achat: {
            type: DataTypes.DECIMAL(6, 2),
            allowNull: false,
            defaultValue: 0.00,
            validate: {min: 0.00},
        },
        kilometrage_achat: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {min: 0},
        },
        dernier_kilometrage: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {
                isGreaterThanKilometrageAchat(value: number) {
                    if (value < ((this as unknown) as Vehicule).kilometrage_achat) {
                        throw new Error("Ce kilométrage doit être supérieur à celui de l'achat !");
                    }
                }
            },
        },
    },
    {
        sequelize,
        tableName: "vehicules",
        timestamps: true,
    }
);

export default Vehicule;

