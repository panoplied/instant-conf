import { setNamespace } from '../../lib/redis';

export default async function handler(req, res) {
  const { namespace, idx } = req.body;

  if (!namespace) {
    res.status(400).json({
      error: 'Namespace title can not be empty',
    });
  }

  await setNamespace(namespace, idx);
  res.status(200).json({
    body: 'success',
  });
}