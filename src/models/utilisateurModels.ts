import { Sequelize, DataTypes, Model } from "sequelize";
import sequelize from "../config/database"; // Adjust the path to your database configuration file


// Définition des attributs d'un Utilisateur
interface UtilisateurAttributes {
    id?: number;
    nom?: string;
    prenom?: string;
    role?: string;
    email?: string;
    telephone?: string;
    mot_de_passe?: string;
    date_inscription?: Date;
    }

// Définition de la classe Utilisateur
class Utilisateur extends Model<UtilisateurAttributes> implements UtilisateurAttributes {
    public id!: number;
    public nom!: string;
    public prenom!: string;
    public role!: string;
    public email!: string;
    public telephone!: string;
    public mot_de_passe!: string;
    public readonly date_inscription!: Date;
}

// Initialisation du modèle Utilisateur et création dans la BDD
Utilisateur.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nom: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        prenom: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING(10),
            allowNull: false,
            defaultValue: "user",
        },
        email: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },
        telephone: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        mot_de_passe: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date_inscription: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        tableName: "utilisateurs",
        timestamps: true,
    }
);

export default Utilisateur;

