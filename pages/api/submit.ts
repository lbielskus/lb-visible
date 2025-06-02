import { NextApiRequest, NextApiResponse } from 'next';
import { createItem } from '../../utils/dbUtils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = req.body;

  try {
    const id = await createItem(data);

    res.status(200).json({ id });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
