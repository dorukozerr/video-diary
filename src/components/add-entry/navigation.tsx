import { Fragment } from 'react';
import { ArrowLeft, ArrowRight, Plus } from 'lucide-react-native';
import { useThemeStore } from '@/stores/theme-store';
import { useAddEntryStore } from '@/stores/add-entry-store';
import { themeTokens } from '@/utils/constants';
import { ActivityIndicator } from '@/components/atoms/activity-indicator';
import { View, Pressable, Text } from '@/components/ui/themed-primitives';

export const Navigation = ({
  onFormSubmit,
  isPending
}: {
  onFormSubmit?: () => Promise<void>;
  isPending?: boolean;
}) => {
  const activeTheme = useThemeStore((state) => state.activeTheme);
  const { step, setStep, baseVideo } = useAddEntryStore();

  const iconProps = {
    size: 16,
    color: `hsl(${themeTokens[activeTheme]['--primary-foreground']})`
  };

  return (
    <View className='flex h-max w-full flex-row items-center justify-between px-4 pb-10'>
      <Pressable
        className={`rounded-full bg-primary p-2 ${step === 0 ? 'opacity-0' : ''}`}
        onPress={() => setStep((step - 1) as 0 | 1)}
        disabled={step === 0}
      >
        <ArrowLeft {...iconProps} />
      </Pressable>
      <Text>{step + 1} / 3</Text>
      <Pressable
        className={`flex flex-row items-center justify-center gap-2 rounded-full bg-primary p-2 ${step === 0 && baseVideo.uri === '' ? 'opacity-0' : ''}`}
        onPress={() =>
          step !== 2
            ? setStep((step + 1) as 1 | 2)
            : step === 2 && onFormSubmit && !isPending && onFormSubmit()
        }
        disabled={(step === 0 && baseVideo.uri === '') || isPending}
      >
        {step === 2 ? (
          isPending ? (
            <ActivityIndicator {...iconProps} />
          ) : (
            <Plus {...iconProps} />
          )
        ) : (
          <ArrowRight {...iconProps} />
        )}
      </Pressable>
    </View>
  );
};
