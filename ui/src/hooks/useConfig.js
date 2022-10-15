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

  return {
    fetchConfig,
    error,
    isPending
  };
}