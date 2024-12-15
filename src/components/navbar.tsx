import { Fragment } from 'react';
import { usePathname, Link } from 'expo-router';
import { Plus, ArrowLeft } from 'lucide-react-native';
import { useThemeStore } from '@/stores/theme-store';
import { themeTokens } from '@/utils/constants';
import { View, Text, Pressable } from '@/components/themed-primitives';

export const Navbar = () => {
  const pathname = usePathname();
  const activeTheme = useThemeStore((state) => state.activeTheme);

  return (
    <View className='flex h-16 w-full flex-row items-center justify-between border-b border-border px-3'>
      {pathname === '/' ? (
        <Fragment>
          <Text className='text-xl font-bold'>Welcome Back!</Text>
          <Link href='/add' asChild>
            <Pressable className='flex flex-row items-center justify-center gap-2'>
              <Plus
                color={`hsl(${themeTokens[activeTheme]['--foreground']})`}
              />
              <Text>Add</Text>
            </Pressable>
          </Link>
        </Fragment>
      ) : (
        <Link href='/'>
          <ArrowLeft
            color={`hsl(${themeTokens[activeTheme]['--foreground']})`}
          />
        </Link>
      )}
    </View>
  );
};
