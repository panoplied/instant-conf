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

export const setNamespace = async (namespace, idx) => {
  const oldNamespaces = (await redis.get('namespaces')).split(',');
  const oldKeys = await redis.keys(`${oldNamespaces[idx]}_*`);

  await Promise.all(oldKeys.map(async key => {
    const newKey = key.replace(`${oldNamespaces[idx]}_`, `${namespace}_`);
    await redis.rename(key, newKey);
  }));

  oldNamespaces[idx] = namespace;
  const newNamespaces = oldNamespaces.toString();
  await redis.set('namespaces', newNamespaces);
}