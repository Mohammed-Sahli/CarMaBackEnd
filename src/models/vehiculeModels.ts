import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import Utilisateur from "./utilisateurModels";

interface VehiculeAttributes {
  id: number;
  immat: string;
  numero_chassis: string;
  utilisateur_id: number;
  marque?: string;
  modele?: string;
  carburant?: string;
  dmec?: Date | null;
  date_achat?: Date | null;
  prix_achat?: number;
  kilometrage_achat?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

type VehiculeCreationAttributes = Optional<VehiculeAttributes, "id">;

class Vehicule extends Model<VehiculeAttributes, VehiculeCreationAttributes>
  implements VehiculeAttributes {
  public id!: number;
  public immat!: string;
  public numero_chassis!: string;
  public utilisateur_id!: number;
  public marque?: string;
  public modele?: string;
  public carburant?: string;
  public dmec?: Date;
  public date_achat?: Date;
  public prix_achat?: number;
  public kilometrage_achat?: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Vehicule.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    immat: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    numero_chassis: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    utilisateur_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    marque: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    modele: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    carburant: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dmec: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    date_achat: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    prix_achat: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: {
        min: 0, // ✅ ici, min attend un number, pas {}
      },
    },
    kilometrage_achat: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      validate: {
        min: 0, // ✅ ici aussi
      },
    },
  },
  {
    sequelize,
    tableName: "vehicules",
    modelName: "Vehicule",
  }
);

// Association : un véhicule appartient à un utilisateur
Vehicule.belongsTo(Utilisateur, {
  foreignKey: "utilisateur_id",
  as: "utilisateur",
});

export default Vehicule;
