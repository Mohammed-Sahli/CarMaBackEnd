import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Utilisateurs",
      version: "1.0.0",
      description: "API pour la gestion des utilisateurs (auth, CRUD)",
    },
    servers: [
      {
        url: "http://localhost:3000", // URL de base de ton API
      },
    ],
    components: {
      schemas: {
        User: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              example: 1,
            },
            nom: {
              type: "string",
              example: "Dupont",
            },
            prenom: {
              type: "string",
              example: "Jean",
            },
            email: {
              type: "string",
              format: "email",
              example: "jean.dupont@example.com",
            },
            role: {
              type: "string",
              example: "admin",
            },
          },
          required: ["id", "nom", "prenom", "email", "role"],
        },
      },
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./src/routes/*.ts", "./src/controllers/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export function setupSwagger(app: Express) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
