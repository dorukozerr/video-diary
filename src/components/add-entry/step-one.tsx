import { FileVideo } from 'lucide-react-native';
import { useThemeStore } from '@/stores/theme-store';
import { useAddEntryStore } from '@/stores/add-entry-store';
import { themeTokens } from '@/utils/constants';
import { Navigation } from '@/components/add-entry/navigation';
import { View, Pressable, Text } from '@/components/ui/themed-primitives';

export const StepOne = () => {
  const activeTheme = useThemeStore((state) => state.activeTheme);
  const pickAsset = useAddEntryStore((state) => state.pickAsset);

  return (
    <View className='flex h-full w-full flex-col items-center justify-center'>
      <View className='flex w-full flex-1 flex-col items-center justify-center'>
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
      </View>
      <Navigation />
    </View>
  );
};
