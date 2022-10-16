import { useConfig } from '../hooks/useConfig';
import { useState } from 'react';

// components
import Record from './Record';

export default function Namespace({ ns, idx }) {
  const { namespace } = ns;
  const prefix = `${namespace}_`;

  const [title, setTitle] = useState(namespace);
  const { setNamespace, error, isPending } = useConfig();

  const handleSubmit = (e) => {
    e.preventDefault();
    const updNamespace = {
      namespace: title,
      idx,
    };
    setNamespace(updNamespace);
  }

  // TODO handle error and pending state when setting namespace
  return (
    <>
      <form
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          style={{ fontSize: '16px' }}
        />
        <button type="submit" style={{ display: 'None' }} />
      </form>

      {ns.records.map(rec => (
        <Record
          key={rec.key}
          record={rec}
          prefix={prefix}
        />
      ))}

      <br />  {/* TODO don't forget to remove this after styling */}
    </>
  );
}
