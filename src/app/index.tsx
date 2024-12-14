import { ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { Plus } from 'lucide-react-native';
import { useThemeStore } from '@/stores/theme-store';
import { themeTokens } from '@/utils/constants';
import { View, Text, Pressable } from '@/components/themed-primitives';
import { EntryCard } from '@/components/entry-card';

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
        <View className='flex flex-col gap-4 p-4'>
          {Array(15)
            .fill('1')
            .map((item, index) => (
              <EntryCard key={index} item={item} />
            ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Root;
