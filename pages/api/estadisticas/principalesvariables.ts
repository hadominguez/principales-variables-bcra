import { NextApiRequest, NextApiResponse } from 'next';
import fetch from '@/utils/fetchs';

const API_BASE_URL = `https://api.bcra.gob.ar/estadisticas/v2.0/PrincipalesVariables`;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  fetch(req, res, API_BASE_URL);
}
