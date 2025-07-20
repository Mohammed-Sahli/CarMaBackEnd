import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { testConnection } from './config/database';
import syncDatabase from './models/syncModels';  // import par défaut corrigé
import userRoutes from './routes/userRoutes';
import vehiculeRoutes from './routes/vehiculeRoutes';
import assuranceRoutes from './routes/assuranceRoutes';
import consommableRoutes from './routes/consommableRoutes';
import entrerepRoutes from './routes/entrerepRoutes';
import controleTechniqueRoutes from './routes/controleTechniqueRoutes';
import dashBordRoutes from './routes/dashBordRoutes';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './config/swagger';

dotenv.config();

const app = express();

const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:4200',
  'http://localhost:3000',
];

// Middleware CORS avec log et gestion d'erreur propre
app.use(cors({
  origin: (origin, callback) => {
    console.log('CORS Origin:', origin);
    
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`Origin ${origin} non autorisée par CORS`));
    }
  },
  credentials: true,
}));

// Pour parser les requêtes JSON
app.use(express.json());

// Définition des routes
app.use('/auth', userRoutes);
app.use('/v', vehiculeRoutes);
app.use('/a', assuranceRoutes);
app.use('/ct', controleTechniqueRoutes);
app.use('/c', consommableRoutes);
app.use('/e', entrerepRoutes);
app.use('/d', dashBordRoutes);

// Swagger API doc
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Gestion des routes non trouvées (404)
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route non trouvée' });
});

// Middleware global de gestion d'erreur (dernière position)
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Erreur serveur :', err.stack || err);
  res.status(500).json({
    message: 'Erreur serveur interne',
    ...(process.env.NODE_ENV === 'development' ? { error: err.message } : {}),
  });
});

// Port d'écoute
const PORT = process.env.PORT || 3000;

(async () => {
  try {
    // Vérification connexion base
    await testConnection();

    // Synchronisation des modèles Sequelize (si besoin)
    await syncDatabase();

    console.log('✅ Base de données connectée et synchronisée');

    // Démarrage serveur
    app.listen(PORT, () => {
      console.log(`✅ Serveur lancé sur : http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation de la base :', error);
    process.exit(1);
  }
})();
