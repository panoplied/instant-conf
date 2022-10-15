import { getConfig } from '../../lib/redis';

export default async function handler(req, res) {
  const config = await getConfig();
  res.status(200).json(config);
}