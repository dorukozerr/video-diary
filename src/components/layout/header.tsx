import { Moon, Sun } from 'lucide-react-native';
import { useThemeStore } from '@/stores/theme-store';
import { themeTokens } from '@/utils/constants';
import { View, Text, Pressable } from '@/components/ui/themed-primitives';

export const Header = () => {
  const activeTheme = useThemeStore((state) => state.activeTheme);
  const setTheme = useThemeStore((state) => state.setTheme);

  const iconProps = {
    size: 16,
    color: `hsl(${themeTokens[activeTheme]['--foreground']})`
  };

  return (
    <View className='flex h-16 w-full flex-row items-center justify-between border-b border-border px-3'>
      <Text className='text-2xl font-bold'>Video Diary</Text>
      <Pressable
        onPress={() => setTheme(activeTheme === 'light' ? 'dark' : 'light')}
      >
        {activeTheme === 'dark' ? (
          <Moon {...iconProps} />
        ) : activeTheme === 'light' ? (
          <Sun {...iconProps} />
        ) : null}
      </Pressable>
    </View>
  );
};
