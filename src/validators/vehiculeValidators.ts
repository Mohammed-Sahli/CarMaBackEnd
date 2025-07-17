import Joi from 'joi';

export const createVehiculeSchema = Joi.object({
  immat: Joi.string().required(),
  numero_chassis: Joi.string().required(),
  utilisateur_id: Joi.number().integer().required(),

  marque: Joi.string().optional().allow(null, ''),
  modele: Joi.string().optional().allow(null, ''),
  carburant: Joi.string().optional().allow(null, ''),
  dmec: Joi.date().iso().optional().allow(null, ''),
  date_achat: Joi.date().iso().optional().allow(null, ''),
  prix_achat: Joi.number().optional().allow(null),
  kilometrage_achat: Joi.number().optional().allow(null),
});

export const updateVehiculeSchema = Joi.object({
  utilisateur_id: Joi.number().integer().optional(),

  date_achat: Joi.date().iso().optional().allow(null, ''),
  prix_achat: Joi.number().optional().allow(null),
  kilometrage_achat: Joi.number().optional().allow(null),
  dernier_kilometrage: Joi.number().optional().allow(null),
});