import { useState, useEffect } from 'react';
import { useConfigContext } from '../hooks/useConfigContext';

export const useConfig = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useConfigContext();

  const getConfig = async () => {
    setError(null);
    setIsPending(true);
    try {
      fetch('http://localhost:3000/api/config')
        .then(res => res.json())
        .then(data => { 
          dispatch({ type: 'GET_CONFIG', payload: data })
        });
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
    getConfig,
    updateNamespace,
    error,
    isPending
  };
}