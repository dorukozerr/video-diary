import { Fragment } from 'react';
import { ArrowLeft, ArrowRight, Plus } from 'lucide-react-native';
import { useThemeStore } from '@/stores/theme-store';
import { useAddEntryStore } from '@/stores/add-entry-store';
import { themeTokens } from '@/utils/constants';
import { View, Pressable, Text } from '@/components/ui/themed-primitives';

export const Navigation = ({
  onFormSubmit
}: {
  onFormSubmit?: () => Promise<void>;
}) => {
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
        className={`flex flex-row items-center justify-center gap-2 rounded-full bg-primary p-3 ${step === 0 && baseVideo.uri === '' ? 'opacity-0' : ''} ${step === 2 ? 'rounded-lg' : ''}`}
        onPress={() =>
          step !== 2
            ? setStep((step + 1) as 1 | 2)
            : onFormSubmit && onFormSubmit()
        }
        disabled={step === 0 && baseVideo.uri === ''}
      >
        {step === 2 ? (
          <Fragment>
            <Plus
              color={`hsl(${themeTokens[activeTheme]['--primary-foreground']})`}
            />
            <Text className='text-primary-foreground'>Submit</Text>
          </Fragment>
        ) : (
          <ArrowRight
            color={`hsl(${themeTokens[activeTheme]['--primary-foreground']})`}
          />
        )}
      </Pressable>
    </View>
  );
};
