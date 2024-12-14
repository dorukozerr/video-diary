import { Link } from 'expo-router';
import { Pressable, View, Text } from '@/components/themed-primitives';

export const EntryCard = ({ item }: { item: string }) => (
  <Link href={`/details/${item}`} asChild>
    <Pressable className='flex h-32 flex-row items-center justify-center rounded-md border border-border'>
      <View className='h-full w-32 bg-muted'></View>
      <View className='flex h-full flex-1 flex-col items-start justify-center p-3'>
        <Text numberOfLines={1} className='text-2xl'>
          Testing
        </Text>
        <Text numberOfLines={2} className='w-full truncate text-base'>
          TTesting Testin Testing Testin Testing Testin Testing Testin esting
          Testin Testing Testin Testing Testin Testing Testin Testing Testin
          Testing Testin Testing TestinTesting Testin Testing Testin Testing
          Testin Testing TestinTesting Testin Testing Testin Testing Testin
          Testing Testin Testing Testin
        </Text>
      </View>
    </Pressable>
  </Link>
);
