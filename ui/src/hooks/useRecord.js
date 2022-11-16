import { useState } from 'react';
import { useConfigContext } from './useConfigContext';

export const useRecord = () => {
  const API_URI = 'http://localhost:3000/api/record';

  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(null);

  const { dispatch } = useConfigContext();

  const createRecord = async (record, namespaceIdx) => {
    setError(null);
    setIsPending(true);
    try {
      const res = await fetch(API_URI, {
        body: JSON.stringify(record),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      });
      const { error } = await res.json();
      if (error) {
        setError(error)
      } else {
        dispatch({ type: 'CREATE_RECORD', payload: { record, namespaceIdx } });
      }
    }
    catch (err) {
      setError(err);
    }
    finally {
      setIsPending(false);
    }
  }

  const updateRecord = async (oldRecord, newRecord, namespaceIdx) => {
    setError(null);
    setIsPending(true);
    try {
      const res = await fetch(API_URI, {
        body: JSON.stringify({ oldRecord, newRecord }),
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

  const removeRecord = async (key, namespaceIdx) => {
    setError(null);
    setIsPending(true);
    try {
      const res = await fetch(API_URI, {
        body: JSON.stringify({ key }),
        headers: { 'Content-Type': 'application/json' },
        method: 'DELETE',
      });
      const { error } = await res.json();
      if (error) {
        setError(error);
      } else {
        dispatch({ type: 'REMOVE_RECORD', payload: { key, namespaceIdx } });
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
    createRecord,
    updateRecord,
    removeRecord,
    resetError,
    error,
    isPending,
  };

}