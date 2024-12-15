import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import { getAllEntries, addEntry } from '@/lib/db';

export const useQueries = () => {
  const queryClient = useQueryClient();

  const getAllEntriesQuery = useQuery({
    queryKey: ['entries'],
    queryFn: getAllEntries
  });

  const addEntryMutation = useMutation({
    mutationFn: addEntry,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['entries'] })
  });

  return { getAllEntriesQuery, addEntryMutation };
};
