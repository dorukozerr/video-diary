import { ScrollView } from 'react-native';
import { useQueries } from '@/hooks/use-queries';
import { View, Pressable, Text } from '@/components/themed-primitives';
import { ActivityIndicator } from '@/components/activity-indicator';
import { EntryCard } from '@/components/entry-card';

const Page = () => {
  const { getAllEntriesQuery } = useQueries();
  const { data, isError, isFetching, refetch } = getAllEntriesQuery;

  return (
    <View className='h-full w-full'>
      {isFetching ? (
        <View className='flex h-full w-full flex-col items-center justify-center'>
          <ActivityIndicator />
        </View>
      ) : isError ? (
        <View className='flex h-full w-full flex-col items-center justify-center gap-3'>
          <Text className='text-2xl'>Error...</Text>
          <Pressable onPress={() => refetch()}>
            <Text className='text-base'>Retry</Text>
          </Pressable>
        </View>
      ) : data.length === 0 ? (
        <View className='flex h-full w-full flex-col items-center justify-center gap-3'>
          <Text className='text-2xl'>No Entry Found</Text>
          <Pressable>
            <Text className='text-base'>Create New</Text>
          </Pressable>
        </View>
      ) : (
        <ScrollView>
          <View className='flex flex-col gap-4 p-4'>
            {data.map((item, index) => (
              <EntryCard key={index} item={item} />
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default Page;
