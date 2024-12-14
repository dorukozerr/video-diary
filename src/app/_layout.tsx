import { Slot } from 'expo-router';
import { useThemeStore } from '@/stores/theme-store';
import { themes } from '@/utils/constants';
import { View, Text } from '@/components/themed-primitives';

import '../../tailwind.css';

const Layout = () => {
  const { activeTheme, setTheme } = useThemeStore((state) => state);

  return (
    <View
      style={themes[activeTheme]}
      className='flex h-full w-full flex-col items-start justify-start'
    >
      <View className='w-full flex-1 border border-red-100 p-4 pt-16'>
        <Slot />
      </View>
      <View className='flex h-24 w-full flex-row items-center justify-center gap-4 bg-red-300'>
        <Text>Navbar</Text>
        <Text
          onPress={() => setTheme(activeTheme === 'light' ? 'dark' : 'light')}
        >
          Change theme
        </Text>
      </View>
    </View>
  );
};

export default Layout;
