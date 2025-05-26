import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for managing API requests with loading, data, and error states
 */
export function useApi<T>(
  apiFunction: () => Promise<T>,
  initialData?: T,
  autoFetch = true
) {
  const [data, setData] = useState<T | undefined>(initialData);
  const [loading, setLoading] = useState<boolean>(autoFetch);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await apiFunction();
      setData(result);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      return undefined;
    } finally {
      setLoading(false);
    }
  }, [apiFunction]);

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, [autoFetch, fetchData]);

  return {
    data,
    loading,
    error,
    fetchData,
    setData
  };
}

/**
 * Custom hook for managing API mutations with loading and error states
 */
export function useMutation<T, U>(
  mutationFunction: (data: U) => Promise<T>
) {
  const [data, setData] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = useCallback(
    async (mutationData: U) => {
      setLoading(true);
      setError(null);
      
      try {
        const result = await mutationFunction(mutationData);
        setData(result);
        return result;
      } catch (err) {
        const errorObj = err instanceof Error ? err : new Error(String(err));
        setError(errorObj);
        return undefined;
      } finally {
        setLoading(false);
      }
    },
    [mutationFunction]
  );

  return {
    data,
    loading,
    error,
    mutate
  };
}

export default useApi;