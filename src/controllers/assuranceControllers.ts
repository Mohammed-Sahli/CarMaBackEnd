import { Request, Response } from 'express';
import Assurance from '../models/assuranceModels';

export const getAllAssurances = async (req: Request, res: Response) => {
  try {
    const assurances = await Assurance.findAll();
    res.json(assurances);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des assurances' });
  }
};

export const createAssurance = async (req: Request, res: Response) => {
  try {
    const newAssurance = await Assurance.create(req.body);
    res.status(201).json(newAssurance);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création de l’assurance' });
  }
};

export const updateAssurance = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [updated] = await Assurance.update(req.body, { where: { id } });
    if (updated) {
      const updatedAssurance = await Assurance.findByPk(id);
      res.json(updatedAssurance);
    } else {
      res.status(404).json({ error: 'Assurance non trouvée' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour de l’assurance' });
  }
};

export const deleteAssurance = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await Assurance.destroy({ where: { id } });
    if (deleted) {
      res.json({ message: 'Assurance supprimée avec succès' });
    } else {
      res.status(404).json({ error: 'Assurance non trouvée' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression de l’assurance' });
  }
};
