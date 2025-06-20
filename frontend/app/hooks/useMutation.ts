import { useState, useCallback } from 'react';

interface UseMutationOptions<TData, TVariables> {
  mutationFn: (variables: TVariables) => Promise<TData>;
  onSuccess?: (data: TData, variables: TVariables) => void | Promise<void>;
  onError?: (error: Error, variables: TVariables) => void | Promise<void>;
  optimisticUpdate?: (variables: TVariables) => void;
  rollback?: () => void;
}

export function useMutation<TData = unknown, TVariables = unknown>({
  mutationFn,
  onSuccess,
  onError,
  optimisticUpdate,
  rollback,
}: UseMutationOptions<TData, TVariables>) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<TData | null>(null);

  const mutate = useCallback(
    async (variables: TVariables) => {
      setIsLoading(true);
      setError(null);

      try {
        // Apply optimistic update if provided
        if (optimisticUpdate) {
          optimisticUpdate(variables);
        }

        const result = await mutationFn(variables);
        setData(result);
        await onSuccess?.(result, variables);
        return result;
      } catch (err) {
        // Rollback optimistic update if provided
        if (rollback) {
          rollback();
        }

        const error = err instanceof Error ? err : new Error(String(err));
        setError(error);
        await onError?.(error, variables);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [mutationFn, onSuccess, onError, optimisticUpdate, rollback]
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setIsLoading(false);
  }, []);

  return {
    mutate,
    isLoading,
    error,
    data,
    reset,
  };
} 