import { useEvent } from 'expo';
import { useVideoPlayer, VideoView, TimeUpdateEventPayload } from 'expo-video';
import { useAddEntryStore } from '@/stores/add-entry-store';
import { millisToSeconds } from '@/utils/helpers';
import { Scrubber } from '@/components/add-entry/scrubber';
import { Navigation } from '@/components/add-entry/navigation';
import { View } from '@/components/ui/themed-primitives';

export const StepTwo = () => {
  const { baseVideo, clipRange } = useAddEntryStore();

  const player = useVideoPlayer(baseVideo.uri, (player) => {
    player.loop = true;
    player.play();
  });

  return (
    <View className='flex h-full w-full flex-col items-center justify-center gap-4'>
      <View className='w-full flex-1 px-4 pt-4'>
        <View className='h-full w-full rounded-md border border-border bg-muted'>
          <VideoView
            style={{
              width: '100%',
              height: '100%'
            }}
            className='bg-muted'
            player={player}
            requiresLinearPlayback={true}
          />
        </View>
      </View>
      <View className='flex h-16 w-full flex-row items-center justify-center px-4'>
        <Scrubber player={player} />
      </View>
      <Navigation />
    </View>
  );
};
