import sequelize from "../config/database";
import Assurance from "./assuraneModels";
import Consommable from "./consommableModels";
import Controle from "./controleTechniqueModels";
import Entrerep from "./entrerepModels";
import Utilisateur from "./utilisateurModels";
import Vehicule from "./vehiculeModels";

const syncDatabase = async () => {
    
try {
    //alter: true Met à jour la structure automatiquement la structure de la base de données
    //à utiliser sans options pour utiliser les migrations en production.
    await sequelize.sync({ alter: true });
    console.log("Base de données synchronisée");
    
} catch (error) {
    console.error("Erreur lors de la synchronisation :", error);
    }
};
   
export { syncDatabase, Utilisateur, Vehicule, Assurance, Controle, Consommable, Entrerep };
