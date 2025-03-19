import { Sequelize, DataTypes, Model } from "sequelize";
import sequelize from "../config/database"; // Adjust the path to your database configuration file


// Définition des attributs d'un Entretien-Reparation
interface EntrerepAttributes {
    id?: number;
    vehicule_id?: number;
    type_entrerep?: string;
    date_entrerep?: Date;
    garage?: string;
    cout?: number;
    kilometrage?: number;
    observation?: string;
    }

// Définition de la classe Entretien-Reparation
class Entrerep extends Model<EntrerepAttributes> implements EntrerepAttributes {
    public id!: number;
    public vehicule_id!: number;
    public type_entrerep!: string;
    public date_entrerep!: Date;
    public garage!: string;
    public cout!: number;
    public kilometrage!: number;
    public observation!: string;
}

// Initialisation du modèle Entretien-Reparation et création dans la BDD
Entrerep.init(
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
        type_entrerep: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        date_entrerep: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        garage: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cout: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0.00,
            validate: {min: 0.00},
        },
        kilometrage: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        observation: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: "entrereps",
        timestamps: true,
    }
);

export default Entrerep;
