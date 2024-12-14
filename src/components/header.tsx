import { Moon, Sun } from 'lucide-react-native';
import { useThemeStore } from '@/stores/theme-store';
import { themeTokens } from '@/utils/constants';
import { View, Text, Pressable } from '@/components/themed-primitives';

export const Header = () => {
  const { activeTheme, setTheme } = useThemeStore();

  return (
    <View className='flex h-16 w-full flex-row items-center justify-between border border-border px-3'>
      <Text className='text-2xl font-bold'>Video Diary</Text>
      <Pressable
        onPress={() => setTheme(activeTheme === 'light' ? 'dark' : 'light')}
      >
        {activeTheme === 'dark' ? (
          <Moon color={`hsl(${themeTokens[activeTheme]['--foreground']})`} />
        ) : activeTheme === 'light' ? (
          <Sun color={`hsl(${themeTokens[activeTheme]['--foreground']})`} />
        ) : null}
      </Pressable>
    </View>
  );
};
