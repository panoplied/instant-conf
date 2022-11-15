import { useNamespace } from '../hooks/useNamespace';
import { useState } from 'react';

export default function AddNamespaceForm() {
  const [isAddingNamespace, setIsAddingNamespace] = useState(false);
  const [namespaceTitle, setNamespaceTitle] = useState('');
  const {createNamespace, resetError, error, isPending} = useNamespace();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createNamespace(namespaceTitle);
    setNamespaceTitle('');
    setIsAddingNamespace(false);
  }

  const handleCancel = (e) => {
    e.preventDefault();
    setIsAddingNamespace(false);
    resetError();
  }

  return (
    <>

      {isPending && <p>Creating Namespace</p>}

      {(!isAddingNamespace && !error) && (
        <button
          onClick={() => setIsAddingNamespace(true)}
          className="w-full p-4"
        >
          Add Namespace
        </button>
      )}
      {(isAddingNamespace || error) && (
      <form onSubmit={handleSubmit}>

        <span>Adding New Namespace</span>

        <div className="flex flex-rows gap-4">

          <input
            className="flex-auto w-full bg-stone-100 dark:bg-stone-800"
            type="text"
            autoFocus
            value={namespaceTitle}
            onChange={e => setNamespaceTitle(e.target.value)}
          />

          <button
            type="submit"
            className="flex-initial p-4 text-white bg-blue-500 hover:bg-blue-400 dark:bg-blue-500 dark:hover:bg-blue-400"
          >
            Add
          </button>

          <button
            onClick={handleCancel}
            className="flex-initial p-3"
          >
            Cancel
          </button>

        </div>

        {error && <p>{error}</p>}

      </form>)}
    </>
  );
}
