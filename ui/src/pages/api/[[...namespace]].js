import { getNamespace, createNamespace, updateNamespace } from '../../lib/redis';

export default async function handler(req, res) {

  const handle = async action => {
    action(req, res);
  }

  switch(req.method) {
    case 'GET':
      return await handle(get);
    case 'POST':
      return await handle(create);
    case 'PATCH':
      return await handle(update);
    case 'DELETE':
      // delete namespace
    default:
      return await handle(get);
  }
}

async function get(req, res) {
  const namespace = req.query.namespace[1];

  try {
    const ns = await getNamespace(namespace);
    return res.status(200).json(ns);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}

async function create(req, res) {
  const { namespace } = req.body;

  if (!namespace) {
    return res.status(400).json({ error: 'Namespace title can not be empty' });
  } 

  try {
    await createNamespace(namespace);
    return res.status(200).json({ body: `Namespace ${namespace} created` });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }

}


async function update(req, res) {
  const { namespace, idx } = req.body;

  if (!namespace) {
    return res.status(400).json({ error: 'Namespace title can not be empty' });
  } 

  try {
    await updateNamespace(namespace, idx);
    return res.status(200).json({ body: 'Namespace updated' });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }

}