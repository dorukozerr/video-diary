import { ArrowLeft, ArrowRight } from 'lucide-react-native';
import { useThemeStore } from '@/stores/theme-store';
import { useAddEntryStore } from '@/stores/add-entry-store';
import { themeTokens } from '@/utils/constants';
import { View, Pressable, Text } from '@/components/ui/themed-primitives';

export const Navigation = () => {
  const { activeTheme } = useThemeStore();
  const step = useAddEntryStore((state) => state.step);
  const setStep = useAddEntryStore((state) => state.setStep);
  const baseVideo = useAddEntryStore((state) => state.baseVideo);

  return (
    <View className='flex h-max w-full flex-row items-center justify-between px-4 pb-10'>
      <Pressable
        className='rounded-full bg-primary p-3'
        onPress={() => setStep(1)}
        disabled={true}
      >
        <ArrowLeft
          color={`hsl(${themeTokens[activeTheme]['--primary-foreground']})`}
        />
      </Pressable>
      <Text>{step} / 3</Text>
      <Pressable
        className='rounded-full bg-primary p-3'
        onPress={() => setStep(1)}
        disabled={true}
      >
        <ArrowRight
          color={`hsl(${themeTokens[activeTheme]['--primary-foreground']})`}
        />
      </Pressable>
    </View>
  );
};
