import { useState, useEffect } from 'react';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useAddEntryStore } from '@/stores/add-entry-store';
import { millisToSeconds } from '@/utils/helpers';
import { Scrubber } from '@/components/add-entry/scrubber';
import { Navigation } from '@/components/add-entry/navigation';
import { View } from '@/components/ui/themed-primitives';

export const StepTwo = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const { baseVideo, clipRange } = useAddEntryStore();

  const player = useVideoPlayer(baseVideo.uri, (player) => {
    player.loop = true;
    player.play();
    player.timeUpdateEventInterval = 1;
  });

  player.addListener('timeUpdate', (payload) => {
    setCurrentTime(payload.currentTime);
  });

  // If clipRange[1] is end of the video it may not enter the if condition and start from
  // beginning of video. Might look into this further.
  useEffect(() => {
    if (currentTime > millisToSeconds(clipRange[1] - 300)) {
      player.pause();
      player.currentTime = millisToSeconds(clipRange[0]);
      player.play();
    }
  }, [currentTime, player, clipRange]);

  return (
    <View className='flex h-full w-full flex-col items-center justify-center gap-4'>
      <View className='w-full flex-1 px-4 pt-4'>
        <View className='h-full w-full rounded-md border border-border bg-muted'>
          <VideoView
            style={{ width: '100%', height: '100%' }}
            className='bg-muted'
            player={player}
            allowsFullscreen={false}
            allowsPictureInPicture={false}
            nativeControls={false}
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
