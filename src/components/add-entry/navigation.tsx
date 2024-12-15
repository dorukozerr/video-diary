import { ArrowLeft, ArrowRight } from 'lucide-react-native';
import { useThemeStore } from '@/stores/theme-store';
import { useAddEntryStore } from '@/stores/add-entry-store';
import { themeTokens } from '@/utils/constants';
import { View, Pressable, Text } from '@/components/ui/themed-primitives';

export const Navigation = () => {
  const activeTheme = useThemeStore((state) => state.activeTheme);
  const { step, setStep, baseVideo } = useAddEntryStore();

  return (
    <View className='flex h-max w-full flex-row items-center justify-between px-4 pb-10'>
      <Pressable
        className={`rounded-full bg-primary p-3 ${step === 0 ? 'opacity-0' : ''}`}
        onPress={() => setStep((step - 1) as 0 | 1)}
        disabled={step === 0}
      >
        <ArrowLeft
          color={`hsl(${themeTokens[activeTheme]['--primary-foreground']})`}
        />
      </Pressable>
      <Text>{step + 1} / 3</Text>
      <Pressable
        className={`rounded-full bg-primary p-3 ${step === 0 && baseVideo.uri === '' ? '!bg-muted-foreground' : ''}`}
        onPress={() =>
          step !== 2
            ? setStep((step + 1) as 1 | 2)
            : console.log('handle entry save event')
        }
        disabled={step === 0 && baseVideo.uri === ''}
      >
        <ArrowRight
          color={`hsl(${themeTokens[activeTheme]['--primary-foreground']})`}
        />
      </Pressable>
    </View>
  );
};
