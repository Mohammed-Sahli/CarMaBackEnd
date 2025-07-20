import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

interface VehiculeAttributes {
  id: number;
  immat: string;
  numero_chassis: string;
  utilisateur_id: number;
  marque?: string | null;
  modele?: string | null;
  carburant?: string | null;
  dmec?: Date | null;
  date_achat?: Date | null;
  prix_achat?: number | null;
  kilometrage_achat?: number | null;
}

interface VehiculeCreationAttributes extends Optional<VehiculeAttributes, "id"> {}

class Vehicule extends Model<VehiculeAttributes, VehiculeCreationAttributes> implements VehiculeAttributes {
  public id!: number;
  public immat!: string;
  public numero_chassis!: string;
  public utilisateur_id!: number;
  public marque!: string | null;
  public modele!: string | null;
  public carburant!: string | null;
  public dmec!: Date | null;
  public date_achat!: Date | null;
  public prix_achat!: number | null;
  public kilometrage_achat!: number | null;

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
      type: DataTypes.DATE,
      allowNull: true,
    },
    date_achat: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    prix_achat: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    kilometrage_achat: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Vehicule",
    tableName: "vehicules",
    timestamps: true,
  }
);

export default Vehicule;
