import { NextApiRequest, NextApiResponse } from 'next';
import fetch from '@/utils/fetchs';

const API_BASE_URL = `https://api.bcra.gob.ar/estadisticas/v2.0/DatosVariable`;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { idVariable, desde, hasta } = req.query;
  fetch(req, res, `${API_BASE_URL}/${idVariable}/${desde}/${hasta}`);
}

