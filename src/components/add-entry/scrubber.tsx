import type { VideoPlayer } from 'expo-video';
import { RangeSlider } from '@react-native-assets/slider';
import { useThemeStore } from '@/stores/theme-store';
import { useAddEntryStore } from '@/stores/add-entry-store';
import { themeTokens } from '@/utils/constants';
import { millisToSeconds } from '@/utils/helpers';
import { View, Text } from '@/components/ui/themed-primitives';

export const Scrubber = ({ player }: { player: VideoPlayer }) => {
  const activeTheme = useThemeStore((state) => state.activeTheme);
  const { clipRange, setClipRange, baseVideo } = useAddEntryStore();

  console.log('log from scrubber', clipRange);

  return (
    <View className='h-full w-full flex-col items-center justify-center'>
      <RangeSlider
        range={clipRange}
        minimumValue={0}
        maximumValue={baseVideo.duration}
        step={0}
        thumbStyle={{
          backgroundColor: `hsl(${themeTokens[activeTheme]['--primary']})`
        }}
        trackStyle={{
          backgroundColor: `hsl(${themeTokens[activeTheme]['--muted']})`
        }}
        enabled={true}
        trackHeight={10}
        thumbSize={25}
        onValueChange={([newMin, newMax]) =>
          newMin !== clipRange[0] && newMin + 5000 < baseVideo.duration
            ? setClipRange([
                newMin,
                Math.min(baseVideo.duration, newMin + 5000)
              ])
            : newMax !== clipRange[1] &&
              newMax - 5000 > 0 &&
              setClipRange([Math.max(0, newMax - 5000), newMax])
        }
        onSlidingStart={() => {
          player.pause();
        }}
        onSlidingComplete={async () => {
          console.log('milliToSeconds =>', millisToSeconds(clipRange[0]));
          player.replay();
          setTimeout(() => {
            player.seekBy(millisToSeconds(clipRange[0]));
          }, 150);

          //player.play();
        }}
        style={{ width: '100%' }}
      />
    </View>
  );
};
