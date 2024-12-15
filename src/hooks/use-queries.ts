import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import { getAllEntries, addEntry } from '@/lib/db';

export const useQueries = () => {
  const { invalidateQueries } = useQueryClient();

  const getAllEntriesQuery = useQuery({
    initialData: [],
    queryKey: ['entries'],
    queryFn: getAllEntries
  });

  const addEntryMutation = useMutation({
    mutationFn: addEntry,
    onSuccess: () => invalidateQueries({ queryKey: ['entries'] })
  });

  return { getAllEntriesQuery, addEntryMutation };
};
