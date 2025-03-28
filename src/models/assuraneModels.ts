import { Sequelize, DataTypes, Model } from "sequelize";
import sequelize from "../config/database"; // Adjust the path to your database configuration file


// Définition des attributs d'un Assurance
interface AssuranceAttributes {
    id?: number;
    vehicule_id?: number;
    assureur?: string;
    numero_police?: string;
    type_assurance?: string;
    date_debut?: Date;
    date_fin?: Date;
    cout_annuel?: number;
    facture?: Buffer;  // Stocke le fichier PDF sous forme de binaire max 1Mo
    }

// Définition de la classe Assurance
class Assurance extends Model<AssuranceAttributes> implements AssuranceAttributes {
    public id!: number;
    public vehicule_id!: number;
    public assureur!: string;
    public numero_police!: string;
    public type_assurance!: string;
    public date_debut!: Date;
    public date_fin!: Date;
    public cout_annuel!: number;
    public facture!: Buffer;
}

// Initialisation du modèle Assurance et création dans la BDD
Assurance.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        vehicule_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'vehicules',
                key: 'id',
            }, 
        },
        assureur: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        numero_police: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },
        type_assurance: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        date_debut: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        date_fin: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        cout_annuel: { 
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0.00,
            validate: {min: 0.00},
        },
        facture: {
            type: DataTypes.BLOB("long"), // Stocke les fichiers binaires
            allowNull: true,
            validate: {
                fileSizeLimit(value: Buffer) {
                    if (value && value.length > 1048576) { // 1 Mo
                        throw new Error("Le fichier PDF ne doit pas dépasser 1 Mo.");
                    }
                },
            },
        },
    },
    {
        sequelize,
        tableName: "assurances",
        timestamps: true,
    }
);


export default Assurance;

