import { router } from 'expo-router';
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import {
  getAllEntries,
  addEntry,
  getEntry,
  updateEntry,
  deleteEntry
} from '@/lib/db';
import { cropVideo } from '@/lib/ffmpeg';

export const useQueries = () => {
  const { navigate } = router;
  const queryClient = useQueryClient();

  const getAllEntriesQuery = useQuery({
    queryFn: getAllEntries,
    queryKey: ['entries']
  });

  const addEntryMutation = useMutation({
    mutationFn: async ({
      baseVideo,
      clipRange,
      name,
      description
    }: {
      baseVideo: { uri: string };
      clipRange: [number, number];
      name: string;
      description: string;
    }) => {
      const res = await cropVideo({ videoUri: baseVideo.uri, clipRange });

      if (!res.success || !res.videoUri) {
        throw new Error('Error on video cropping process');
      }

      await addEntry({
        name,
        description,
        uri: res.videoUri
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['entries'] });
      navigate('/');
    }
  });

  const useGetEntryQuery = (id: string) =>
    useQuery({
      queryFn: async () => await getEntry(id),
      queryKey: ['entries', id]
    });

  const updateEntryMutation = useMutation({
    mutationFn: async ({
      id,
      name,
      description
    }: {
      id: string;
      name: string;
      description: string;
    }) => updateEntry({ id, name, description }),
    onSuccess: (_, { id }) =>
      queryClient.invalidateQueries({ queryKey: ['entries', id] })
  });

  const deleteEntryMutation = useMutation({
    mutationFn: async (id: string) => await deleteEntry(id),
    onSuccess: (_, id) => {
      navigate('/');
      queryClient.invalidateQueries({ queryKey: ['entries', id] });
    }
  });

  return {
    getAllEntriesQuery,
    addEntryMutation,
    useGetEntryQuery,
    updateEntryMutation,
    deleteEntryMutation
  };
};
