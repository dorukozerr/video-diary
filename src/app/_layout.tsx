import { Slot } from 'expo-router';
import { useThemeStore } from '@/stores/theme-store';
import { themes } from '@/utils/constants';
import { SafeAreaView, View } from '@/components/themed-primitives';
import { Header } from '@/components/header';

import '../../tailwind.css';

const Layout = () => {
  const activeTheme = useThemeStore((state) => state.activeTheme);

  // TODO: When safe area background becomes white ios simulator topbar becomes
  // unvisible. Like time, battery, wifi status ..etc. Is it happening because I
  // implemented theming wrong or something else idk.

  return (
    <SafeAreaView
      style={themes[activeTheme]}
      className='flex h-full w-full flex-col items-start justify-start bg-black'
    >
      <Header />
      <View className='w-full flex-1'>
        <Slot />
      </View>
    </SafeAreaView>
  );
};

export default Layout;
