import Redis from 'ioredis';
const redis = new Redis(process.env.REDIS_URL);

export const getConfig = async () => {
  return await Promise.all(
    (await redis.get('namespaces'))
    .split(',')
    .map(async namespace => {

      const keys = await redis.keys(`${namespace}_*`);
      let values = [];

      await redis.mget(keys, (err, res) => {
        if (err) throw err;
        values = res;
      });

      return {
        namespace,
        records: keys.map((key, i) => ({ key, value: values[i] })),
      };
    })
  )
}
