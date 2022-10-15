import { useEffect } from 'react';
import { useConfigContext } from '../hooks/useConfigContext';
import { useConfig } from '../hooks/useConfig';

export default function Config() {
  const { config } = useConfigContext();
  const { fetchConfig, error, isPending } = useConfig();

  useEffect(() => {
    fetchConfig();
  }, []);

  return (
    <>

      {isPending && <h3>Loading...</h3>}

      {error && <h3 style={{ color: red }}>{error}</h3>}

      {config && (config.map(ns => (

        <div key={ns.namespace}>
          <h3>{ns.namespace}</h3>

          {ns.records.map(rec => (

            <div key={rec.key}>
              <input value={rec.key} />
              <input value={rec.value} />
            </div>

          ))}

        </div>

      )))}

    </>
  );
}
