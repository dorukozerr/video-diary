// import { useEvent } from 'expo';
import { useVideoPlayer, VideoView } from 'expo-video';
import { FileVideo, ArrowLeft, ArrowRight } from 'lucide-react-native';
import { useThemeStore } from '@/stores/theme-store';
import { themeTokens } from '@/utils/constants';
import { useAddNewEntryProcess } from '@/hooks/use-add-new-entry-process';
import { View, Pressable, Text } from '@/components/ui/themed-primitives';

const Page = () => {
  const activeTheme = useThemeStore((state) => state.activeTheme);
  const { baseVideo, processStep, pickAsset, setProcessStep } =
    useAddNewEntryProcess();

  const player = useVideoPlayer(baseVideo.uri, (player) => {
    player.loop = true;
    player.play();
  });

  //  const { isPlaying } = useEvent(player, 'playingChange', {
  //    isPlaying: player.playing
  //  });

  return (
    <View className='flex- h-full w-full items-center justify-center'>
      {processStep === 0 ? (
        <View className='flex flex-col items-center justify-center'>
          <View className='flex-1' />
          <Pressable
            className='flex flex-row items-center justify-center gap-2 rounded-md bg-primary px-4 py-3'
            onPress={pickAsset}
          >
            <FileVideo
              color={`hsl(${themeTokens[activeTheme]['--primary-foreground']})`}
            />
            <Text className='text-base font-bold text-primary-foreground'>
              Upload Video
            </Text>
          </Pressable>
          <View className='flex-1' />
          <View className='flex h-max w-full flex-row items-center justify-end px-4 pb-10'>
            {baseVideo.uri !== '' ? (
              <Pressable
                className='rounded-full bg-primary p-3'
                onPress={() => setProcessStep(1)}
              >
                <ArrowRight
                  color={`hsl(${themeTokens[activeTheme]['--primary-foreground']})`}
                />
              </Pressable>
            ) : null}
          </View>
        </View>
      ) : processStep === 1 ? (
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
              onPress={() => setProcessStep(0)}
            >
              <ArrowLeft
                color={`hsl(${themeTokens[activeTheme]['--primary-foreground']})`}
              />
            </Pressable>
            <Pressable
              className='rounded-full bg-primary p-3'
              onPress={() => setProcessStep(1)}
            >
              <ArrowRight
                color={`hsl(${themeTokens[activeTheme]['--primary-foreground']})`}
              />
            </Pressable>
          </View>
        </View>
      ) : processStep === 2 ? (
        <View className='h-full w-full'>
          <Text className='text-base font-bold'>Add Metadata</Text>
        </View>
      ) : null}
    </View>
  );
};

export default Page;
