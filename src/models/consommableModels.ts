import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

interface ConsommableAttributes {
  id?: number;
  vehicule_id: number;
  type_consommable: string;
  date_achat: Date;
  kilometrage_achat: number;
  quantite: number;
  cout?: number;
  facture?: Buffer | null;
  observation?: string | null;
}

class Consommable extends Model<ConsommableAttributes> implements ConsommableAttributes {
  public id!: number;
  public vehicule_id!: number;
  public type_consommable!: string;
  public date_achat!: Date;
  public kilometrage_achat!: number;
  public quantite!: number;
  public cout!: number;
  public facture!: Buffer | null;
  public observation!: string | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

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
        model: "vehicules",
        key: "id",
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
      defaultValue: 0.0,
      validate: {
        min: 0.0,
      },
    },
    facture: {
      type: DataTypes.BLOB("long"),
      allowNull: true,
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
