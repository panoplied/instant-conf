import Head from 'next/head';
import { useConfig } from '../hooks/useConfig';

export default function Home() {
  const { config, error, isPending } = useConfig();

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="instant-conf web ui" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {isPending && <h3>Loading...</h3>}

      {error && <h3 style={{color: red}}>{error}</h3>}

      {config && (config.map(ns => (

        <div key={ns.namespace}>
          <h3>{ns.namespace}</h3>
          {ns.records.map(rec =>(
            <div key={rec.key}>
              <input value={rec.key} />
              <input value={rec.value} />
            </div>
          ))}
        </div>

      )))}
    </div>
  );
}
