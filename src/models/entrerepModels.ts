import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

interface EntrerepAttributes {
  id?: number;
  vehicule_id: number;
  type_entrerep: string;
  date_entrerep: Date;
  garage: string;
  cout?: number;
  kilometrage: number;
  facture?: Buffer | null;
  observation?: string | null;
}

class Entrerep extends Model<EntrerepAttributes> implements EntrerepAttributes {
  public id!: number;
  public vehicule_id!: number;
  public type_entrerep!: string;
  public date_entrerep!: Date;
  public garage!: string;
  public cout!: number;
  public kilometrage!: number;
  public facture!: Buffer | null;
  public observation!: string | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

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
        model: "vehicules",
        key: "id",
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
      defaultValue: 0.0,
      validate: {
        min: 0.0,
      },
    },
    kilometrage: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
    tableName: "entrereps",
    timestamps: true,
  }
);

export default Entrerep;
