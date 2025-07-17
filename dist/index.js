"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./config/database");
const syncModels_1 = require("./models/syncModels");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const vehiculeRoutes_1 = __importDefault(require("./routes/vehiculeRoutes"));
const assuranceRoutes_1 = __importDefault(require("./routes/assuranceRoutes"));
const consommableRoutes_1 = __importDefault(require("./routes/consommableRoutes"));
const entrerepRoutes_1 = __importDefault(require("./routes/entrerepRoutes"));
const controleTechniqueRoutes_1 = __importDefault(require("./routes/controleTechniqueRoutes"));
const dashBordRoutes_1 = __importDefault(require("./routes/dashBordRoutes"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = __importDefault(require("./config/swagger"));
// Chargement des variables d'environnement
dotenv_1.default.config();
// Création du serveur Express
const app = (0, express_1.default)();
// Middleware CORS : autoriser les requêtes depuis le frontend Angular
app.use((0, cors_1.default)({
    origin: 'http://localhost:4200',
    credentials: true
}));
// Middleware pour parser le JSON
app.use(express_1.default.json());
// Connexion à la base de données
(0, database_1.testConnection)().then(() => (0, syncModels_1.syncDatabase)());
// Définition du port du serveur
const PORT = 3000;
// Définition des routes
app.use('/auth', userRoutes_1.default);
app.use('/v', vehiculeRoutes_1.default);
app.use('/a', assuranceRoutes_1.default);
app.use('/ct', controleTechniqueRoutes_1.default);
app.use('/c', consommableRoutes_1.default);
app.use('/e', entrerepRoutes_1.default);
app.use('/d', dashBordRoutes_1.default);
// Swagger UI (documentation API)
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default));
// Lancement du serveur
app.listen(PORT, () => {
    console.log(`✅ Serveur lancé sur : http://localhost:${PORT}`);
});
