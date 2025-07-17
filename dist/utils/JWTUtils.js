"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = generateToken;
exports.verifyToken = verifyToken;
exports.getUserIdFromPayload = getUserIdFromPayload;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = process.env.JWT_KEY;
function generateToken(payload) {
    if (SECRET_KEY === undefined) {
        throw new Error("JWT_KEY n'est pas présente dans les variables d'environnement");
    }
    //Génère un token sogné avec les données du payload, et le crypte avec la clé secrète
    //le tokeb expire dans une heure/
    return jsonwebtoken_1.default.sign(payload, SECRET_KEY, { expiresIn: '1h' });
}
function verifyToken(token) {
    if (SECRET_KEY === undefined) {
        throw new Error("JWT_KEY n'est pas présente dans les variables d'environnement");
    }
    try {
        //Vérifie la validité du tokent à l'aide de la clé secrète.
        //Si le tokent est valude, retourne le payload contenu dans le token.
        return jsonwebtoken_1.default.verify(token, SECRET_KEY);
    }
    catch (error) {
        return null;
    }
}
function getUserIdFromPayload(payloadJson) {
    const payload = JSON.parse(payloadJson) || null;
    return payload.id || null;
}
