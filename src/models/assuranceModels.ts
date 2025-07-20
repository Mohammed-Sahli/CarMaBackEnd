import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

interface AssuranceAttributes {
  id?: number;
  vehicule_id: number;
  assureur: string;
  numero_police: string;
  type_assurance: string;
  date_debut: Date;
  date_fin: Date;
  cout_annuel: number;
  facture?: Buffer | null; // fichier PDF binaire max 1Mo
}

interface AssuranceCreationAttributes extends Optional<AssuranceAttributes, "id" | "facture"> {}

class Assurance extends Model<AssuranceAttributes, AssuranceCreationAttributes> implements AssuranceAttributes {
  public id!: number;
  public vehicule_id!: number;
  public assureur!: string;
  public numero_police!: string;
  public type_assurance!: string;
  public date_debut!: Date;
  public date_fin!: Date;
  public cout_annuel!: number;
  public facture!: Buffer | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Assurance.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    vehicule_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "vehicules",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
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
      defaultValue: 0.0,
      validate: {
        min: 0.0,
      },
    },
    facture: {
      type: DataTypes.BLOB("long"),
      allowNull: true,
      validate: {
        fileSizeLimit(value: Buffer | null) {
          if (value && value.length > 1048576) {
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
