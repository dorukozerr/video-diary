import { ScrollView } from 'react-native';
import { useQueries } from '@/hooks/use-queries';
import { View, Pressable, Text } from '@/components/ui/themed-primitives';
import { ActivityIndicator } from '@/components/atoms/activity-indicator';
import { EntryCard } from '@/components/home-page/entry-card';

const Page = () => {
  const { getAllEntriesQuery } = useQueries();
  const { data, isError, isFetching, refetch, error } = getAllEntriesQuery;

  return (
    <View className='h-full w-full'>
      {isFetching ? (
        <View className='flex h-full w-full flex-col items-center justify-center'>
          <ActivityIndicator />
        </View>
      ) : isError ? (
        <View className='flex h-full w-full flex-col items-center justify-center gap-5'>
          <Text className='text-2xl'>{error.message ?? 'Unknown Error'}</Text>
          <Pressable
            className='rounded-md bg-primary px-4 py-3'
            onPress={() => refetch()}
          >
            <Text className='text-sm font-medium text-primary-foreground'>
              Retry
            </Text>
          </Pressable>
        </View>
      ) : data.length === 0 ? (
        <View className='flex h-full w-full flex-col items-center justify-center gap-5'>
          <Text className='text-2xl'>No Entry Found</Text>
          <Pressable className='rounded-md bg-primary px-4 py-3'>
            <Text className='text-sm font-medium text-primary-foreground'>
              Create New
            </Text>
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
