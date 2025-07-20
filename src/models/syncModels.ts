import sequelize from '../config/database';
import Utilisateur from './utilisateurModels';
import Vehicule from './vehiculeModels';
import Assurance from './assuranceModels';
import ControleTechnique from './controleTechniqueModels';
import Consommable from './consommableModels';
import EntretienReparation from './entrerepModels';

const syncDatabase = async () => {
  // Association Utilisateur -> Vehicule (1:N)
  Utilisateur.hasMany(Vehicule, {
    foreignKey: 'utilisateur_id',
    as: 'vehicules',
  });
  Vehicule.belongsTo(Utilisateur, {
    foreignKey: 'utilisateur_id',
    as: 'utilisateur',
  });

  // Assurance appartient à un véhicule (N:1)
  Assurance.belongsTo(Vehicule, {
    foreignKey: 'vehicule_id',
    as: 'vehiculeAssurance',
  });
  Vehicule.hasMany(Assurance, {
    foreignKey: 'vehicule_id',
    as: 'assurances',
  });

  // Contrôle technique appartient à un véhicule (N:1)
  ControleTechnique.belongsTo(Vehicule, {
    foreignKey: 'vehicule_id',
    as: 'vehiculeControle',
  });
  Vehicule.hasMany(ControleTechnique, {
    foreignKey: 'vehicule_id',
    as: 'controleTechniques',
  });

  // Consommable appartient à un véhicule (N:1)
  Consommable.belongsTo(Vehicule, {
    foreignKey: 'vehicule_id',
    as: 'vehiculeConsommable',
  });
  Vehicule.hasMany(Consommable, {
    foreignKey: 'vehicule_id',
    as: 'consommables',
  });

  // Entretien/Réparation appartient à un véhicule (N:1)
  EntretienReparation.belongsTo(Vehicule, {
    foreignKey: 'vehicule_id',
    as: 'vehiculeEntretien',
  });
  Vehicule.hasMany(EntretienReparation, {
    foreignKey: 'vehicule_id',
    as: 'entretienReparations',
  });

  // Synchronisation Sequelize
  await sequelize.sync({ alter: true });
};

export default syncDatabase;
