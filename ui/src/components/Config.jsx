import { useConfigContext } from '../hooks/useConfigContext';
import { useConfig } from '../hooks/useConfig';
import { useEffect } from 'react';

// components
import Namespace from './Namespace';

export default function Config() {
  const { config } = useConfigContext();
  const { getConfig, error, isPending } = useConfig();

  useEffect(() => {
    getConfig();
  }, []);

  return (
    <div className="
      sm:w-full md:w-[90%] lg:w-[90%] xl:w-[80%] 2xl:min-w-[50%] 2xl:max-w-[60%]
    ">
      {isPending && <h3>Loading...</h3>}

      {error && <h3 style={{ color: red }}>{error}</h3>}

      {config && (config.map((ns, idx) => (
        <div key={ns.namespace} className="mb-4 border border-stone-300 dark:border-stone-700">
          <Namespace ns={ns} idx={idx} />
        </div>
      )))}
    </div>
  );
}
