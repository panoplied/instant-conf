import { useConfigContext } from '../hooks/useConfigContext';
import { useConfig } from '../hooks/useConfig';
import { useEffect } from 'react';

// components
import Namespace from './Namespace';

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
        <Namespace
          key={ns.namespace}
          ns={ns}
        />
      )))}
    </>
  );
}
