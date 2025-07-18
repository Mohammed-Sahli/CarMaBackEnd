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
}

interface VehiculeCreationAttributes extends Optional<VehiculeAttributes, "id"> {}

class Vehicule extends Model<VehiculeAttributes, VehiculeCreationAttributes> implements VehiculeAttributes {
  public id!: number;
  public immat!: string;
  public numero_chassis!: string;
  public utilisateur_id!: number;
  public marque?: string;
  public modele?: string;
  public carburant?: string;
  public dmec?: Date | null;
  public date_achat?: Date | null;
  public prix_achat?: number;
  public kilometrage_achat?: number;
}

Vehicule.init(
  {
    id: {
      type: DataTypes.INTEGER,
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
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    marque: {
      type: DataTypes.STRING,
    },
    modele: {
      type: DataTypes.STRING,
    },
    carburant: {
      type: DataTypes.STRING,
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
    },
    kilometrage_achat: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    modelName: "Vehicule",
    tableName: "vehicules",
  }
);

Vehicule.belongsTo(Utilisateur, {
  foreignKey: "utilisateur_id",
  as: "utilisateur",
});

export default Vehicule;
