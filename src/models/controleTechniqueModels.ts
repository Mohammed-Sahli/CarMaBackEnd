import { Sequelize, DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

interface ControleAttributes {
  id?: number;
  vehicule_id?: number;
  date_controle?: Date;
  kilometrage_controle?: number;
  controleur?: string;
  resultat?: string;
  cout?: number;
  prochain_controle?: Date;
  facture?: Buffer;
  observation?: string;
}

class Controle extends Model<ControleAttributes> implements ControleAttributes {
  public id!: number;
  public vehicule_id!: number;
  public date_controle!: Date;
  public kilometrage_controle!: number;
  public controleur!: string;
  public resultat!: string;
  public cout!: number;
  public prochain_controle!: Date;
  public facture!: Buffer;
  public observation!: string;
}

Controle.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    vehicule_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "vehicules", key: "id" },
    },
    date_controle: { type: DataTypes.DATE, allowNull: false },
    kilometrage_controle: { type: DataTypes.INTEGER, allowNull: false },
    controleur: { type: DataTypes.STRING(50), allowNull: false },
    resultat: { type: DataTypes.STRING(255), allowNull: false },
    cout: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.0,
      validate: { min: 0.0 },
    },
    prochain_controle: { type: DataTypes.DATE, allowNull: false },
    facture: { type: DataTypes.BLOB("long"), allowNull: true },
    observation: { type: DataTypes.STRING(255), allowNull: true },
  },
  {
    sequelize,
    tableName: "controles",
    timestamps: true,
  }
);

export default Controle;
