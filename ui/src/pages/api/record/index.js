import { createRecord, updateRecord, removeRecord } from '../../../lib/redis';

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
      return await handle(remove);
    default:
      return await handle(get);
  }
}

async function get(req, res) {
  return res.status(404).json({ error: 'No record specified at the end of URL' });
}

async function create(req, res) {
  const { key, value } = req.body;

  if (!key) {
    return res.status(400).json({ error: 'Record key can not be empty' });
  }

  try {
    await createRecord(key, value);
    return res.status(200).json({ body: `Record {${key}:${value}} created` });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}

async function update(req, res) {
  const { oldRecord, newRecord } = req.body;
  if (!oldRecord || !newRecord) {
    return res.status(400).json({ error: 'No record specified, can not update'});
  }

  try {
    await updateRecord(oldRecord, newRecord);
    return res.status(200).json({ body: 'Record updated' });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}

async function remove(req, res) {
  const { key } = req.body;

  try {
    await removeRecord(key);
    return res.status(200).json({ body: 'Record removed' });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}