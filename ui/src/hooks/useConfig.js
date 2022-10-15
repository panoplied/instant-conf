import { useState, useEffect } from 'react';

export const useConfig = () => {
  const [config, setConfig] = useState(null);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    fetchConfig()
  }, []);

  const fetchConfig = async () => {
    setError(null);
    setIsPending(true);
    try {
      fetch('http://localhost:3000/api/getConfig')
        .then(res => res.json())
        .then(data => setConfig(data))
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
    config,
    error,
    isPending
  };
}