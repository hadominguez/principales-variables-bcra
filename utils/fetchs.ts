import { NextApiRequest, NextApiResponse } from 'next';
import https from 'https';


export default async function fetch(req: NextApiRequest, res: NextApiResponse, API_BASE_URL: string) {
  try {
    const url = `${API_BASE_URL}`;
    console.log(url);
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      rejectUnauthorized: false  // Deshabilita la verificación del certificado
    };

    const data = await new Promise((resolve, reject) => {
      const request = https.request(url, options, (response) => {
        let data = '';
        response.on('data', (chunk) => {
          data += chunk;
        });
        response.on('end', () => {
            console.log(data)
          resolve(JSON.parse(data));
        });
      });

      request.on('error', (error) => {
        reject(error);
      });

      request.end();
    });

    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
