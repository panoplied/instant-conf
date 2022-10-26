import { getNamespace } from '../../../lib/redis';

export default async function handler(req, res) {

  const { namespace } = req.query;

  try {
    const ns = await getNamespace(namespace);
    return res.status(200).json(ns);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}