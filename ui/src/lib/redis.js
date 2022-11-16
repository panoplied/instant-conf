import Redis from 'ioredis';
const redis = new Redis(process.env.REDIS_URL);


// ---[ GLOBAL CONFIG OPERATIONS ]---

// Get Config
export const getConfig = async () => {
  const namespaces = await redis.get('namespaces');

  if (!namespaces) return null;

  return await Promise.all(
    namespaces.split(',').map(async namespace => {
      const keys = await redis.keys(`${namespace}_*`);
      let values = [];

      if (keys.length > 0) {
        await redis.mget(keys, (err, res) => {
          if (err) throw err;
          values = res;
        });
      }

      return {
        namespace,
        records: keys.map((key, i) => ({ key, value: values[i] })),
      };
    })
  );
}


// ---[ NAMESPACE OPERATIONS ]---

// Get Namespace
export const getNamespace = async (namespace) => {
  const namespaces = await redis.get('namespaces');
  if (!namespaces) throw new Error('No namespaces yet created');
  if (!namespaces.split(',').includes(namespace)) throw new Error('No such namespace exist');

  const keys = await redis.keys(`${namespace}_*`);
  let values = [];

  if (keys.length > 0) {
    await redis.mget(keys, (err, res) => {
      if (err) throw err;
      values = res;
    });
  }

  return {
    namespace,
    records: keys.map((key, i) => ({ key, value: values[i] })),
  };
}

// Create Namespace
export const createNamespace = async (namespace) => {
  const curNamespaces = await redis.get('namespaces');
  if (!curNamespaces) {
    await redis.set('namespaces', namespace);
  } else {
    const namespaces = curNamespaces.split(',');
    if (namespaces.includes(namespace)) throw new Error(`Namespace ${namespace} already exists`);

    namespaces.push(namespace);
    await redis.set('namespaces', namespaces.toString());
  }
}

// Update Namespace
export const updateNamespace = async (namespace, idx) => {
  const curNamespaces = (await redis.get('namespaces'));
  if (!curNamespaces) throw new Error('No namespaces yet created');

  const namespaces = curNamespaces.split(',');
  if (namespaces.includes(namespace)) throw new Error(`Namespace ${namespace} already exists`);
  const curKeys = await redis.keys(`${namespaces[idx]}_*`);

  await Promise.all(curKeys.map(async key => {
    const newKey = key.replace(`${namespaces[idx]}_`, `${namespace}_`);
    await redis.rename(key, newKey);
  }));

  namespaces[idx] = namespace;
  await redis.set('namespaces', namespaces.toString());
}

// Remove Namespace
export const removeNamespace = async (namespace) => {
  const curNamespaces = (await redis.get('namespaces'));
  if (!curNamespaces) throw new Error('No namespaces yet created');

  const namespaces = curNamespaces.split(',');
  const newNamespaces = namespaces.filter(ns => ns !== namespace);

  const keys = await redis.keys(`${namespace}_*`);
  if (keys.length > 0) {
    await redis.del(keys);
  }

  await redis.set('namespaces', newNamespaces.toString());
}


// ---[ RECORD OPERATIONS ]---

// Get Record
export const getRecord = async (key) => {
  const value = await redis.get(key); 
  if (!value) throw new Error('No such record');

  return { key: value };
}

// Create Record
export const createRecord = async (key, value) => {
  if (await redis.exists(key)) throw new Error('Record already exists');

  await redis.set(key, value);
}

// Update Record
export const updateRecord = async (oldRecord, newRecord) => {
  const { key: oldKey, value: oldValue } = oldRecord;
  const { key: newKey, value: newValue } = newRecord;

  if (!await redis.exists(oldKey)) throw new Error('No such record exists');

  if (oldValue != newValue) await redis.set(oldKey, newValue);
  if (oldKey != newKey) await redis.rename(oldKey, newKey);
}

// Remove Record
export const removeRecord = async (key) => {
  if (!await redis.exists(key)) throw new Error('No such record exists');
  await redis.del(key);
}