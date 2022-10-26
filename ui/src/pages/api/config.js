import { getConfig } from '../../lib/redis';

export default async function handler(req, res) {
  try {
    const config  = await getConfig();
    return res.status(200).json(config);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: e.message });
  }
}