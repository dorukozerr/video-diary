import { FileVideo } from 'lucide-react-native';
import { useThemeStore } from '@/stores/theme-store';
import { themeTokens } from '@/utils/constants';
import { useAddNewEntryProcess } from '@/hooks/use-add-new-entry-process';
import { View, Pressable, Text } from '@/components/ui/themed-primitives';

const Page = () => {
  const activeTheme = useThemeStore((state) => state.activeTheme);
  const { processStep, pickAsset } = useAddNewEntryProcess();

  return (
    <View className='flex- h-full w-full items-center justify-center'>
      {processStep === 0 ? (
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
      ) : processStep === 1 ? (
        <View className='flex h-full w-full items-center justify-center bg-red-100'>
          <Text>Edit video</Text>
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
