import express from 'express';
import dotenv from 'dotenv';
import { testConnection } from './config/database';
import { syncDatabase } from './models/syncModels';
import userRoutes from './routes/userRoutes';
import vehiculeRoutes from './routes/vehiculeRoutes';
import assuranceRoutes from './routes/assuranceRoutes';
import consommableRoutes from './routes/consommableRoutes';
import entrerepRoutes from './routes/entrerepRoutes';
import controleTechniqueRoutes from './routes/controleTechniqueRoutes';
import dashBordRoutes from './routes/dashBordRoutes';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './config/swagger';

//Création d'un serveur Express
const app = express();

//chargement des variables d'environnement
dotenv.config();

// Connecter à Sequelize
testConnection().then(() => syncDatabase());

//Définition du port du serveur
const PORT = 3000;
console.log("lancement du serveur")

//Config du serveur par défaut
app.use(express.json());

//TODO ajouter ici connection à la BDD

//TODO ajouter ici les routes
app.use('/auth', userRoutes)
app.use('/v', vehiculeRoutes)
app.use('/a', assuranceRoutes)
app.use('/ct', controleTechniqueRoutes)
app.use('/c', consommableRoutes)
app.use('/e', entrerepRoutes)
app.use('/d', dashBordRoutes )

// Swagger route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//app.listen indique au serveur d'écouter les requêtes HTTP arrivant sur le

//port indiqué
app.listen(PORT, () => {
 console.log(`Server is running on http://localhost:${PORT}`);
});