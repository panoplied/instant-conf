import { useState } from 'react';

// components
import Record from './Record';

export default function Namespace({ ns }) {
  const { namespace } = ns;
  const prefix = `${namespace}_`;

  const [title, setTitle] = useState(namespace);

  return (
    <>
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        style={{ fontSize: '16px' }}
      />

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
