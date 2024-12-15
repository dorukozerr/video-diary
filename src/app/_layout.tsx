import { Slot } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useThemeStore } from '@/stores/theme-store';
import { themes } from '@/utils/constants';
import { SafeAreaView, View } from '@/components/themed-primitives';
import { Header } from '@/components/header';
import { Navbar } from '@/components/navbar';

import '../../tailwind.css';

const queryClient = new QueryClient();

const Layout = () => {
  const activeTheme = useThemeStore((state) => state.activeTheme);

  // TODO: When safe area background becomes white ios simulator topbar becomes
  // unvisible. Like time, battery, wifi status ..etc. Is it happening because I
  // implemented theming wrong or something else idk. I set SafeAreaView background
  // to black to solve this but if users system theme is dark this can make topbar
  // invisible again. Must look into this further.

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView
        style={themes[activeTheme]}
        className='flex h-full w-full flex-col items-start justify-start bg-black'
      >
        <Header />
        <Navbar />
        <View className='w-full flex-1'>
          <Slot />
        </View>
      </SafeAreaView>
    </QueryClientProvider>
  );
};

export default Layout;
