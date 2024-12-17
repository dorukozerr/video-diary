import { router } from 'expo-router';
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import { getAllEntries, addEntry } from '@/lib/db';
import { cropVideo } from '@/lib/ffmpeg';

export const useQueries = () => {
  const { navigate } = router;
  const queryClient = useQueryClient();

  const getAllEntriesQuery = useQuery({
    queryKey: ['entries'],
    queryFn: getAllEntries
  });

  const addEntryMutation = useMutation({
    mutationFn: async ({
      baseVideo,
      clipRange,
      name,
      description
    }: {
      baseVideo: { uri: string; duration: number };
      clipRange: [number, number];
      name: string;
      description: string;
    }) => {
      const res = await cropVideo({ videoUri: baseVideo.uri, clipRange });

      if (!res.success || !res.videoUri) {
        throw new Error('Error on video cropping process');
      }

      const { changes } = await addEntry({
        name,
        description,
        uri: res.videoUri
      });

      if (changes === 1) {
        navigate('/');
      }
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['entries'] })
  });

  return { getAllEntriesQuery, addEntryMutation };
};
