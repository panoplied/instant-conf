import Redis from 'ioredis';
const redis = new Redis(process.env.REDIS_URL);

export const getConfig = async () => {
  return await Promise.all(
    (await redis.get('namespaces'))
    .split(',')
    .map(async namespace => {

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
  )
}

// TODO don't forget to update all record prefixes in the namespace
export const setNamespace = async (namespace, idx) => {
  // Get old namespaces
  const namespaces = (await redis.get('namespaces')).split(',');
  console.log('old namespaces', namespaces);

  // Get keys for old namespace which is going to be updated
  const keys = await redis.keys(`${namespaces[idx]}_*`);
  console.log('old keys', keys);

  // Rename keys
  const newKeys = await Promise.all(keys.map(async key => {
    const newKey = key.replace(`${namespaces[idx]}_`, `${namespace}_`);
    await redis.rename(key, newKey);
    return newKey;  // just for test
  }));
  console.log('new keys', newKeys);

  // Create new string of namespaces
  namespaces[idx] = namespace;
  const newNamespaces = namespaces.toString();
  await redis.set('namespaces', newNamespaces);
  console.log('new namespaces', newNamespaces);
}