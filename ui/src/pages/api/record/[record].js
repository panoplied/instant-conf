import { getRecord } from '../../../lib/redis';

export default async function handler(req, res) {

  const { record } = req.query;

  try {
    const rec = await getRecord(record);
    return res.status(200).json(rec);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}