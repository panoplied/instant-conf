import { useNamespace } from '../hooks/useNamespace';
import { useState } from 'react';

// components
import Record from './Record';

export default function Namespace({ ns, idx }) {
  const { namespace } = ns;
  const prefix = `${namespace}_`;

  const [title, setTitle] = useState(namespace);
  const { updateNamespace, removeNamespace, error, isPending } = useNamespace();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newNamespace = {
      namespace: title,
      idx,
    };
    updateNamespace(newNamespace);
  }

  const handleDelete = async (e) => {
    await removeNamespace(namespace, idx);
  }

  // TODO handle pending state when setting namespace
  // TODO explicitly update namespace (on button click etc.)
  return (
    <>

      <div className="flex">

        <form onSubmit={handleSubmit} className="flex-auto w-full" >
          <div className="p-2 text-xl">
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
          <button type="submit" style={{ display: 'None' }} />
        </form>

        <button onClick={handleDelete} className="flex-initial p-2">DEL</button>

      </div>

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
