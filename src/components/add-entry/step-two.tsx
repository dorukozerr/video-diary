import { useVideoPlayer, VideoView } from 'expo-video';
import { ArrowLeft, ArrowRight } from 'lucide-react-native';
import { useThemeStore } from '@/stores/theme-store';
import { useAddEntryStore } from '@/stores/add-entry-store';
import { themeTokens } from '@/utils/constants';
import { View, Pressable, Text } from '@/components/ui/themed-primitives';

export const StepTwo = () => {
  const activeTheme = useThemeStore((state) => state.activeTheme);
  const baseVideo = useAddEntryStore((state) => state.baseVideo);
  const setStep = useAddEntryStore((state) => state.setStep);

  const player = useVideoPlayer(baseVideo.uri, (player) => {
    player.loop = true;
    player.play();
  });

  return (
    <View className='flex h-full w-full flex-col items-center justify-center'>
      <View className='w-full flex-1'>
        <VideoView
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'red'
          }}
          player={player}
        />
      </View>
      <Text>Edit video</Text>
      <View className='flex h-max w-full flex-row items-center justify-between px-4 pb-10'>
        <Pressable
          className='rounded-full bg-primary p-3'
          onPress={() => setStep(0)}
        >
          <ArrowLeft
            color={`hsl(${themeTokens[activeTheme]['--primary-foreground']})`}
          />
        </Pressable>
        <Pressable
          className='rounded-full bg-primary p-3'
          onPress={() => setStep(1)}
        >
          <ArrowRight
            color={`hsl(${themeTokens[activeTheme]['--primary-foreground']})`}
          />
        </Pressable>
      </View>
    </View>
  );
};
