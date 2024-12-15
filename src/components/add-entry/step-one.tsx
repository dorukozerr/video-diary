import { Fragment } from 'react';
import { FileVideo } from 'lucide-react-native';
import { useThemeStore } from '@/stores/theme-store';
import { useAddEntryStore } from '@/stores/add-entry-store';
import { themeTokens } from '@/utils/constants';
import { ActivityIndicator } from '@/components/atoms/activity-indicator';
import { Navigation } from '@/components/add-entry/navigation';
import { View, Pressable, Text } from '@/components/ui/themed-primitives';

export const StepOne = () => {
  const { activeTheme } = useThemeStore();
  const { pickAsset, isPending, baseVideo, errorMessage } = useAddEntryStore();

  return (
    <View className='flex h-full w-full flex-col items-center justify-center'>
      <View className='flex w-full flex-1 flex-col items-center justify-center gap-4 p-4'>
        <Text className='text-center text-base text-foreground'>
          Create your video diary entry in 3 simple steps:
        </Text>
        <Text className='text-center text-sm text-muted-foreground'>
          1. Select a video from your device that you'd like to add to your
          diary. Choose any meaningful moment you want to remember.
        </Text>
        <Text className='text-center text-sm text-muted-foreground'>
          2. Pick your favorite 5-second moment from the video. This will be the
          highlight that you'll save and revisit later.
        </Text>
        <Text className='text-center text-sm text-muted-foreground'>
          3. Give your memory a title and add a description to help you remember
          why this moment was special.
        </Text>
        <Text className='text-center text-sm italic text-primary'>
          Let's start by choosing a video from your device!
        </Text>
        <Pressable
          className='flex flex-row items-center justify-center gap-2 rounded-md bg-primary px-4 py-3'
          onPress={() => !isPending && pickAsset()}
        >
          {isPending ? (
            <ActivityIndicator
              color={`hsl(${themeTokens[activeTheme]['--primary-foreground']})`}
            />
          ) : (
            <Fragment>
              <FileVideo
                color={`hsl(${themeTokens[activeTheme]['--primary-foreground']})`}
              />
              <Text className='text-base font-bold text-primary-foreground'>
                Select
              </Text>
            </Fragment>
          )}
        </Pressable>
        {baseVideo.fileName !== '' ? (
          <Text className='text-center text-sm text-muted-foreground'>
            {baseVideo.fileName}
          </Text>
        ) : null}
        {errorMessage !== '' ? (
          <Text className='text-center text-sm text-destructive'>
            {errorMessage}
          </Text>
        ) : null}
      </View>
      <Navigation />
    </View>
  );
};
