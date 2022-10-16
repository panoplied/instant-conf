// import { useConfigContext } from '../hooks/useConfigContext';

// components
import Record from './Record';

export default function Namespace({ namespace }) {
  // const { config } = useConfigContext();
  console.log(namespace);

  return (
    <div>
      <h3>{namespace.namespace}</h3>

      {namespace.records.map(rec => (
        <Record
          key={rec.key}
          record={rec}
          prefix={`${namespace.namespace}_`}
        />
      ))}

    </div>
  );
}
