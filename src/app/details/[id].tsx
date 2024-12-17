import { usePathname } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useQueries } from '@/hooks/use-queries';
import { ActivityIndicator } from '@/components/atoms/activity-indicator';
import { View, Text } from '@/components/ui/themed-primitives';

const Page = () => {
  const pathname = usePathname();
  const { useGetEntryQuery } = useQueries();
  const { isPending, data } = useGetEntryQuery(pathname.split('/')[2] ?? '');
  const player = useVideoPlayer(data?.uri ?? '', (player) => {
    player.loop = true;
    player.play();
  });

  return isPending ? (
    <View className='flex h-full w-full items-center justify-center'>
      <ActivityIndicator />
    </View>
  ) : (
    <View className='flex h-full w-full flex-col items-start justify-start gap-4 p-4'>
      <View className='h-80 w-full rounded-md border border-border bg-muted'>
        <VideoView
          player={player}
          style={{ width: '100%', height: '100%' }}
          allowsFullscreen={true}
          nativeControls={false}
        />
      </View>
      <Text className='text-3xl font-bold'>{data?.name}</Text>
      <Text className='text-lg'>{data?.description}</Text>
      <Text>{new Date(data?.created_at ?? 0).toLocaleString()}</Text>
    </View>
  );
};

export default Page;
