import { useConfigContext } from '../hooks/useConfigContext';
import { useConfig } from '../hooks/useConfig';
import { useEffect, useState } from 'react';

// components
import Namespace from './Namespace';
import AddNamespaceForm from './AddNamespaceForm';

export default function Config() {
  const { config } = useConfigContext();
  const { getConfig, configError, configIsPending } = useConfig();
  const [isAddingNamespace, setIsAddingNamespace] = useState(false);

  const resetAddingNamespace = () => {
    setIsAddingNamespace(false);
  }

  useEffect(() => {
    getConfig();
  }, []);

  return (
    <div className="sm:w-full md:w-[90%] lg:w-[90%] xl:w-[80%] 2xl:min-w-[50%] 2xl:max-w-[60%]">

      {configIsPending && <h3>Loading...</h3>}

      {configError && <h3 style={{ color: red }}>{configError}</h3>}

      {config && (config.map((ns, idx) => (
        <div key={ns.namespace} className="mb-4 border border-stone-300 dark:border-stone-700">
          <Namespace ns={ns} idx={idx} />
        </div>
      )))}

      {(config && !isAddingNamespace) && (
        <button
          onClick={() => setIsAddingNamespace(true)}
          className="w-full p-4"
        >
          Add Namespace
        </button>
      )}

      {(config && isAddingNamespace) && (
        <AddNamespaceForm reset={resetAddingNamespace} />
      )}

    </div>
  );
}
