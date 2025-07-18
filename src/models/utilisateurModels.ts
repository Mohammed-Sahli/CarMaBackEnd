import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database"; // ta config Sequelize

// Définition des attributs du modèle Utilisateur
interface UtilisateurAttributes {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  mot_de_passe: string;
  role: string;
  resetPasswordToken?: string | null;
  resetPasswordExpires?: Date | null;
}

// Pour la création, certains champs sont optionnels (id, reset token)
interface UtilisateurCreationAttributes extends Optional<UtilisateurAttributes, "id" | "resetPasswordToken" | "resetPasswordExpires"> {}

class Utilisateur extends Model<UtilisateurAttributes, UtilisateurCreationAttributes> implements UtilisateurAttributes {
  public id!: number;
  public nom!: string;
  public prenom!: string;
  public email!: string;
  public mot_de_passe!: string;
  public role!: string;
  public resetPasswordToken!: string | null;
  public resetPasswordExpires!: Date | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Utilisateur.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    nom: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    prenom: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    mot_de_passe: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: "utilisateur",
    },
    resetPasswordToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    resetPasswordExpires: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "utilisateurs",
    timestamps: true,
    modelName: "Utilisateur",
  }
);

export default Utilisateur;
