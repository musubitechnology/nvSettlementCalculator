import { v4 as uuidv4 } from 'uuid';
import { Lien } from '../types';

export const initialLien: Lien = {
  id: uuidv4(),
  description: '',
  originalAmount: 0,
  reductionAmount: 0,
  negotiatedAmount: 0,
  reductionPercentage: 0
};