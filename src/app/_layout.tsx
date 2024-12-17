import { Slot } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useThemeStore } from '@/stores/theme-store';
import { themes } from '@/utils/constants';
import { SafeAreaView } from '@/components/ui/themed-primitives';
import { Header } from '@/components/layout/header';
import { Navbar } from '@/components/layout/navbar';

import '../../tailwind.css';

const queryClient = new QueryClient();

const Layout = () => {
  const activeTheme = useThemeStore((state) => state.activeTheme);

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView
        style={themes[activeTheme]}
        className='flex h-full w-full flex-col items-start justify-start bg-background'
      >
        <Header />
        <Navbar />
        <Slot />
      </SafeAreaView>
    </QueryClientProvider>
  );
};

export default Layout;
