import { ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { Plus } from 'lucide-react-native';
import { useThemeStore } from '@/stores/theme-store';
import { themeTokens } from '@/utils/constants';
import { View, Text, Pressable } from '@/components/themed-primitives';

const Root = () => {
  const activeTheme = useThemeStore((state) => state.activeTheme);

  return (
    <View className='h-full w-full'>
      <View className='flex h-16 w-full flex-row items-center justify-between border-b border-border px-3'>
        <Text className='text-xl font-bold'>Welcome!</Text>
        <Link href='/add' asChild>
          <Pressable className='flex flex-row items-center justify-center gap-2'>
            <Plus color={`hsl(${themeTokens[activeTheme]['--foreground']})`} />
            <Text>Add</Text>
          </Pressable>
        </Link>
      </View>
      <ScrollView>
        {[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, , 2, 2].map((_item) => (
          <Text className='text-7xl'>Testing</Text>
        ))}
      </ScrollView>
    </View>
  );
};

export default Root;
