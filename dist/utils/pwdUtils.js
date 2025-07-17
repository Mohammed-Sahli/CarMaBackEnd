"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = hashPassword;
exports.verifyPassword = verifyPassword;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// Définition du nombre de "rounds" pour le salage des mots de passe.
// Plus le nombre est élevé, plus le hachage sera sécurisé, mais il sera aussi plus lent.
const saltRounds = 10;
/**
 * Fonction pour hacher un mot de passe.
 *
 * @param password - Le mot de passe brut à hacher.
 * @returns Une promesse qui résout une chaîne de caractères représentant le mot de passe haché.
 */
function hashPassword(password) {
    return __awaiter(this, void 0, void 0, function* () {
        //Utilise bcrypt pour générer un hachage sécurisé du mot de passe.
        return bcryptjs_1.default.hash(password, saltRounds);
    });
}
/**
 * Fonction pour vérifier si un mot de passe correspond à un hachage donné.
 *
 * @param password - Le mot de passe brut à vérifier.
 * @param hash - Le hachage avec lequel comparer le mot de passe.
 * @returns Une promesse qui résout un booléen indiquant si le mot de passe correspond au hachage.
 */
function verifyPassword(password, hash) {
    return __awaiter(this, void 0, void 0, function* () {
        //Compare le mot de passe brut avec le hachage en utilisant bcrypt.
        //Retourne true si les deux correspondent, sinon false.
        return bcryptjs_1.default.compare(password, hash);
    });
}
