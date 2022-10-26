import Redis from 'ioredis';
const redis = new Redis(process.env.REDIS_URL);


// ---[ GLOBAL CONFIG OPERATIONS ]---

// Get Config
export const getConfig = async () => {
  const ns = await redis.get('namespaces');

  if (ns) {
    return await Promise.all(
      ns.split(',').map(async namespace => {
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
  return null;
}


// ---[ NAMESPACE OPERATIONS ]---

// Get Namespace
export const getNamespace = async (namespace) => {
  const redisError = new Error('Could not get namespace, check Redis instance');
  const namespaces = await redis.get('namespaces');

  if (!namespaces) {
    throw new Error('No namespaces yet created');
  }

  if (!namespaces.split(',').includes(namespace)) {
    throw new Error('No such namespace exist');
  } else {
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
  return null;
}

// Create Namespace
export const createNamespace = async (namespace) => {
  const redisError = new Error('Could not create namespace, check Redis instance');
  const curNamespaces = await redis.get('namespaces');

  if (!curNamespaces) {
    const result = await redis.set('namespaces', namespace);
    if (result !== "OK") throw redisError;
  }
  
  const namespaces = curNamespaces.split(',');
  if (namespaces.includes(namespace)) throw new Error(`Namespace ${namespace} already exists`);

  namespaces.push(namespace);

  const result = await redis.set('namespaces', namespaces.toString());
  if (result !== "OK") throw redisError;
}

// Update Namespace
export const updateNamespace = async (namespace, idx) => {
  const namespaces = (await redis.get('namespaces')).split(',');
  if (namespaces.includes(namespace)) throw new Error(`Namespace ${namespace} already exists`);
  const curKeys = await redis.keys(`${namespaces[idx]}_*`);

  await Promise.all(curKeys.map(async key => {
    const newKey = key.replace(`${namespaces[idx]}_`, `${namespace}_`);
    await redis.rename(key, newKey);
  }));

  namespaces[idx] = namespace;
  const result = await redis.set('namespaces', namespaces.toString());
  if (result !== "OK") throw new Error ('Could not update namespace, check Redis instance');
}

// TODO
// get namespace
  // (name)
  // Return all records
// Delete Namespace
  // (name)
  // Delete all records


// ---[ RECORD OPERATIONS ]---

// TODO
// Get Record
// Create Record
// Update Record
// Delete Record