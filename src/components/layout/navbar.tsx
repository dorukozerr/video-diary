import { Fragment } from 'react';
import { usePathname, Link } from 'expo-router';
import { Plus, ArrowLeft } from 'lucide-react-native';
import { useThemeStore } from '@/stores/theme-store';
import { themeTokens } from '@/utils/constants';
import { View, Text, Pressable } from '@/components/ui/themed-primitives';

export const Navbar = () => {
  const pathname = usePathname();
  const activeTheme = useThemeStore((state) => state.activeTheme);

  const iconProps = {
    size: 16,
    color: `hsl(${themeTokens[activeTheme]['--foreground']})`
  };

  return (
    <View className='flex h-16 w-full flex-row items-center justify-between border-b border-border px-3'>
      {pathname === '/' ? (
        <Fragment>
          <Text className='text-xl font-bold'>Welcome!</Text>
          <Link href='/add-entry' asChild>
            <Pressable className='flex flex-row items-center justify-center gap-2'>
              <Plus {...iconProps} />
            </Pressable>
          </Link>
        </Fragment>
      ) : (
        <Fragment>
          <Link href='/'>
            <ArrowLeft {...iconProps} />
          </Link>
          <Text className='text-lg font-bold'>
            {pathname.includes('add-entry')
              ? 'Create Entry'
              : pathname.includes('details')
                ? 'Entry Details'
                : null}
          </Text>
        </Fragment>
      )}
    </View>
  );
};
