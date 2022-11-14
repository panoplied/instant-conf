import { useNamespace } from '../hooks/useNamespace';
import { useState } from 'react';

export default function AddNamespaceForm({ reset }) {

  const [namespaceTitle, setNamespaceTitle] = useState('');
  const {createNamespace, error, isPending} = useNamespace();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createNamespace(namespaceTitle);
    reset();
  }

  const handleCancel = (e) => {
    e.preventDefault();
    reset();
  }

  return (
    <form onSubmit={handleSubmit}>

      <span>Adding New Namespace</span>

      <div className="flex flex-rows gap-4">

        <input
          className="flex-auto w-full bg-stone-800"
          type="text"
          autoFocus
          value={namespaceTitle}
          onChange={e => setNamespaceTitle(e.target.value)}
        />

        <button
          onClick={handleCancel}
          className="flex-initial p-3"
        >
          Cancel
        </button>

        <button className="flex-initial p-4">
          Add
        </button>

      </div>

    </form>
  );
}
