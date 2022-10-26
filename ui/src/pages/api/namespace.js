import { createNamespace, updateNamespace } from '../../lib/redis';

export default async function handler(req, res) {
  switch(req.method) {
    case 'GET':
      // get namespace
    case 'POST':
      await create(req, res);
    case 'PATCH':
      await update(req, res);
    case 'DELETE':
      // delete namespace
    default:
      // get namespace
  }
}

async function create(req, res) {
  const { namespace } = req.body;

  if (!namespace) {
    return res.status(400).json({ error: 'Namespace title can not be empty' });
  } 

  try {
    await createNamespace(namespace);
    res.status(200).json({ body: `Namespace ${namespace} created` });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e.message });
  }

}


async function update(req, res) {
  const { namespace, idx } = req.body;

  if (!namespace) {
    return res.status(400).json({ error: 'Namespace title can not be empty' });
  } 

  try {
    await updateNamespace(namespace, idx);
    res.status(200).json({ body: 'Namespace updated' });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e.message });
  }

}