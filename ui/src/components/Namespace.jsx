import { useConfig } from '../hooks/useConfig';
import { useState } from 'react';

// components
import Record from './Record';

export default function Namespace({ ns, idx }) {
  const { namespace } = ns;
  const prefix = `${namespace}_`;

  const [title, setTitle] = useState(namespace);
  const { updateNamespace, error, isPending } = useConfig();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newNamespace = {
      namespace: title,
      idx,
    };
    updateNamespace(newNamespace);
  }

  // TODO handle error and pending state when setting namespace
  return (
    <>

      <form onSubmit={handleSubmit} >
        <div className="p-2 text-xl">
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <button type="submit" style={{ display: 'None' }} />
      </form>

      {ns.records.map(rec => (
        <div
          key={rec.key}
          className="py-2 odd:bg-stone-200 dark:odd:bg-stone-800"
        >
          <Record record={rec} prefix={prefix} />
        </div>
      ))}

    </>
  );
}
