import { Sequelize, DataTypes, Model } from "sequelize";
import sequelize from "../config/database"; // Adjust the path to your database configuration file


// Définition des attributs d'un Consommables
interface ConsommableAttributes {
    id?: number;
    vehicule_id?: number;
    type_consommable?: string;
    date_achat?: Date;
    kilometrage_achat?: number;
    quantite?: number;
    cout?: number;
    observation?: string;
    }

// Définition de la classe Consommable
class Consommable extends Model<ConsommableAttributes> implements ConsommableAttributes {
    public id!: number;
    public vehicule_id!: number;
    public type_consommable!: string;
    public date_achat!: Date;
    public kilometrage_achat!: number;
    public quantite!: number;
    public cout!: number;
}

// Initialisation du modèle Consommable et création dans la BDD
Consommable.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        vehicule_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'vehicules',
                key: 'id',
            },
        },
        type_consommable: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date_achat: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        kilometrage_achat: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        quantite: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        cout: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0.00,
            validate: {min: 0.00},
        },
        observation: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: "consommables",
        timestamps: true,
    }
);

export default Consommable;
