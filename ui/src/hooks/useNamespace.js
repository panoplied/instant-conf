import { useState } from 'react';
import { useConfigContext } from '../hooks/useConfigContext';

export const useNamespace = () => {

  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(null);

  const { dispatch } = useConfigContext();

  const createNamespace = async (namespace) => {
    setError(null);
    setIsPending(true);
    try {
      const res = await fetch('http://localhost:3000/api/namespace', {
        body: JSON.stringify({ namespace }),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      });
      const { error } = await res.json();
      if (error) { setError(error) }
    }
    catch (err) {
      setError(err);
    }
    finally {
      dispatch({ type: 'CREATE_NAMESPACE', payload: namespace });
      setIsPending(false);
    }
  }

  const updateNamespace = async ({ namespace, idx }) => {
    setError(null);
    setIsPending(true);
    try {
      const res = await fetch('http://localhost:3000/api/namespace', {
        body: JSON.stringify({ namespace, idx }),
        headers: { 'Content-Type': 'application/json' },
        method: 'PATCH',
      });
      const { error } = await res.json();
      if (error) { setError(error) }
    }
    catch (err) {
      setError(err);
    }
    finally {
      setIsPending(false);
    }
  }

  return {
    createNamespace,
    updateNamespace,
    error,
    isPending,
  };

}