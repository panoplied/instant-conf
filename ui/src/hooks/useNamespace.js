import { useState } from 'react';
import { useConfigContext } from '../hooks/useConfigContext';

export const useNamespace = () => {
  const API_URI = 'http://localhost:3000/api/namespace';

  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(null);

  const { dispatch } = useConfigContext();


  const createNamespace = async (namespace) => {
    setError(null);
    setIsPending(true);
    try {
      const res = await fetch(API_URI, {
        body: JSON.stringify({ namespace }),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      });
      const { error } = await res.json();
      if (error) {
        setError(error)
      } else {
        dispatch({ type: 'CREATE_NAMESPACE', payload: namespace });
      }
    }
    catch (err) {
      setError(err);
    }
    finally {
      setIsPending(false);
    }
  }

  const updateNamespace = async ({ namespace, idx }) => {
    setError(null);
    setIsPending(true);
    try {
      const res = await fetch(API_URI, {
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

  const removeNamespace = async (namespace, idx) => {
    setError(null);
    setIsPending(true);
    try {
      const res = await fetch(API_URI, {
        body: JSON.stringify({ namespace }),
        headers: { 'Content-Type': 'application/json' },
        method: 'DELETE',
      });
      const { error } = await res.json();
      if (error) {
        setError(error)
      } else {
        dispatch({ type: 'REMOVE_NAMESPACE', payload: idx });
      }
    }
    catch (err) {
      setError(err);
    }
    finally {
      setIsPending(false);
    }
  }

  const resetError = () => {
    setError(null);
  }

  return {
    createNamespace,
    updateNamespace,
    removeNamespace,
    resetError,
    error,
    isPending,
  };

}