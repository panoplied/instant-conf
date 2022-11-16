import { useNamespace } from '../hooks/useNamespace';
import { useState } from 'react';

export default function AddNamespaceForm() {
  const [isAddingNamespace, setIsAddingNamespace] = useState(false);
  const [namespaceTitle, setNamespaceTitle] = useState('');
  const {createNamespace, resetError, error, isPending} = useNamespace();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createNamespace(namespaceTitle);
    resetForm();
  }

  const handleCancel = (e) => {
    resetForm();
    resetError();
  }

  const resetForm = () => {
    setNamespaceTitle('');
    setIsAddingNamespace(false);
  }

  return (
    <>

      {isPending && <p>Creating Namespace</p>}

      {(!isAddingNamespace && !error) && (
        <button
          onClick={() => setIsAddingNamespace(true)}
          className="w-full p-3 text-xs"
        >
          ADD NAMESPACE
        </button>
      )}

      {(isAddingNamespace || error) && (
        <form onSubmit={handleSubmit}>

          <span className="text-sm">Adding New Namespace</span>

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
              className="flex-initial p-3 text-white bg-blue-500 hover:bg-blue-400 dark:bg-blue-500 dark:hover:bg-blue-400 text-xs"
            >
              ADD
            </button>

            <button
              onClick={handleCancel}
              className="flex-initial p-3 text-xs"
            >
              ESC
            </button>

          </div>

          {error && <p className="text-red-600 text-xs">{error}</p>}

        </form>
      )}
    </>
  );
}
