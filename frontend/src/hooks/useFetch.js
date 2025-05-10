// src/hooks/useFetch.js
import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for fetching data.
 * @param {Function} fetcher — async function that returns the data (e.g. () => api.get('/teams'))
 * @param {Array} deps — dependency array to re-run the fetch
 */
export default function useFetch(fetcher, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const reload = useCallback(() => {
    setLoading(true);
    setError(null);
    fetcher()
      .then(res => {
        setData(res);
      })
      .catch(err => {
        console.error('useFetch error:', err);
        setError(err);
      })
      .finally(() => setLoading(false));
  }, [fetcher]);

  useEffect(() => {
    reload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, loading, error, reload };
}
