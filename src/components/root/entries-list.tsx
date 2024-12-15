import { ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { Video } from '@/types';
import { View, Text, Pressable } from '@/components/ui/themed-primitives';
import { EntryCard } from '@/components/root/entry-card';

export const EntriesList = ({ entries }: { entries: Video[] }) =>
  entries.length === 0 ? (
    <View className='flex h-full w-full flex-col items-center justify-center gap-5'>
      <Text className='text-2xl'>No Entry Found</Text>
      <Link href='/add-entry' asChild>
        <Pressable className='rounded-md bg-primary px-4 py-3'>
          <Text className='text-sm font-medium text-primary-foreground'>
            Create One
          </Text>
        </Pressable>
      </Link>
    </View>
  ) : (
    <ScrollView>
      <View className='flex flex-col gap-4 p-4'>
        {entries.map((entry) => (
          <EntryCard key={`entryCard-${entry.id}`} entry={entry} />
        ))}
      </View>
    </ScrollView>
  );
