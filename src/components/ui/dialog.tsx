import { ReactNode } from 'react';
import Animated, { FadeIn } from 'react-native-reanimated';
import { X } from 'lucide-react-native';
import { useThemeStore } from '@/stores/theme-store';
import { themeTokens } from '@/utils/constants';
import { View, Pressable } from '@/components/ui/themed-primitives';

export const Dialog = ({
  children,
  open,
  onClose
}: {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
}) => {
  const activeTheme = useThemeStore((state) => state.activeTheme);

  return open ? (
    <Animated.View
      entering={FadeIn.duration(500).springify()}
      className='absolute z-10 flex h-full w-full items-center justify-center'
    >
      <Pressable
        className='absolute left-0 top-0 h-full w-full bg-background opacity-80'
        onPress={onClose}
      />
      <View className='relative z-30 h-max w-[90%] rounded-md border border-border bg-background p-4'>
        <Pressable
          className='absolute right-2 top-2 z-50 rounded-full p-0'
          onPress={onClose}
        >
          <X color={`hsl(${themeTokens[activeTheme]['--primary']})`} />
        </Pressable>
        <View className='relative z-40'>{children}</View>
      </View>
    </Animated.View>
  ) : null;
};
