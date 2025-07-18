import sequelize from '../config/database';
import Utilisateur from './utilisateurModels';
import Vehicule from './vehiculeModels';
import Assurance from './assuraneModels';
import ControleTechnique from './controleTechniqueModels';
import Consommable from './consommableModels';
import EntretienReparation from './entrerepModels';

const syncDatabase = async () => {
  // ✅ Un utilisateur a plusieurs véhicules
  Utilisateur.hasMany(Vehicule, {
    foreignKey: 'utilisateur_id',
    as: 'vehicules',
  });

  // ✅ Assurance appartient à un véhicule
  Assurance.belongsTo(Vehicule, {
    foreignKey: 'vehicule_id',
    as: 'vehiculeAssurance',
  });

  Vehicule.hasMany(Assurance, {
    foreignKey: 'vehicule_id',
    as: 'assurances',
  });

  // ✅ Contrôle technique appartient à un véhicule
  ControleTechnique.belongsTo(Vehicule, {
    foreignKey: 'vehicule_id',
    as: 'vehiculeControle',
  });

  Vehicule.hasMany(ControleTechnique, {
    foreignKey: 'vehicule_id',
    as: 'controleTechniques',
  });

  // ✅ Consommable appartient à un véhicule
  Consommable.belongsTo(Vehicule, {
    foreignKey: 'vehicule_id',
    as: 'vehiculeConsommable',
  });

  Vehicule.hasMany(Consommable, {
    foreignKey: 'vehicule_id',
    as: 'consommables',
  });

  // ✅ Entretien/Réparation appartient à un véhicule
  EntretienReparation.belongsTo(Vehicule, {
    foreignKey: 'vehicule_id',
    as: 'vehiculeEntretien',
  });

  Vehicule.hasMany(EntretienReparation, {
    foreignKey: 'vehicule_id',
    as: 'entretienReparations',
  });

  await sequelize.sync({ alter: true });
};

export default syncDatabase;
