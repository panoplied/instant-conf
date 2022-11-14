import { useState, useEffect } from 'react';
import { useConfigContext } from '../hooks/useConfigContext';

export const useConfig = () => {
  const [configError, setConfigError] = useState(null);
  const [configIsPending, setConfigIsPending] = useState(false);

  const { dispatch } = useConfigContext();

  const getConfig = async () => {
    setConfigError(null);
    setConfigIsPending(true);
    try {
      fetch('http://localhost:3000/api/config')
        .then(res => res.json())
        .then(config => { 
          dispatch({ type: 'GET_CONFIG', payload: config })
        });
    }
    catch (err) {
      setConfigError(err);
    }
    finally {
      setConfigIsPending(false);
    }
  }

  return {
    getConfig,
    configError,
    configIsPending,
  };
}