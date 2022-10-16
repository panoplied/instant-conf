import { useState, useEffect } from 'react';
import { useConfigContext } from '../hooks/useConfigContext';

export const useConfig = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useConfigContext();

  const fetchConfig = async () => {
    setError(null);
    setIsPending(true);
    try {
      fetch('http://localhost:3000/api/getConfig')
        .then(res => res.json())
        .then(data => { 
          dispatch({ type: 'FETCH_CONFIG', payload: data })
        });
    }
    catch (err) {
      setError(err);
    }
    finally {
      setIsPending(false);
    }
  }

  const setNamespace = async ({ namespace, idx }) => {
    setError(null);
    setIsPending(true);
    try {
      const res = await fetch('http://localhost:3000/api/setNamespace', {
        body: JSON.stringify({
          namespace,
          idx,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });
      const { err } = await res.json();
      if (err) { setError(err) }
    }
    catch (err) {
      setError(err);
    }
    finally {
      setIsPending(false);
    }
  }

  return {
    fetchConfig,
    setNamespace,
    error,
    isPending
  };
}