import { Link } from 'expo-router';
import { Video } from '@/types';
import { Pressable, View, Text } from '@/components/ui/themed-primitives';

export const EntryCard = ({ entry }: { entry: Video }) => {
  const { id, name, description } = entry;

  return (
    <Link href={`/details/${id}`} asChild>
      <Pressable className='flex h-32 flex-row items-center justify-center rounded-md border border-border'>
        <View className='h-full w-32 bg-muted'></View>
        <View className='flex h-full flex-1 flex-col items-start justify-center p-3'>
          <Text numberOfLines={1} className='text-2xl'>
            {name}
          </Text>
          <Text numberOfLines={2} className='w-full truncate text-base'>
            {description}
          </Text>
        </View>
      </Pressable>
    </Link>
  );
};
