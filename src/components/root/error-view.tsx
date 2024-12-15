import { useQueries } from '@/hooks/use-queries';
import { View, Text, Pressable } from '@/components/ui/themed-primitives';

export const ErrorView = () => {
  const { getAllEntriesQuery } = useQueries();
  const { error, refetch } = getAllEntriesQuery;

  return (
    <View className='flex h-full w-full flex-col items-center justify-center gap-5'>
      <Text className='text-2xl'>{error?.message ?? 'Unknown Error'}</Text>
      <Pressable
        className='rounded-md bg-primary px-4 py-3'
        onPress={() => refetch()}
      >
        <Text className='text-sm font-medium text-primary-foreground'>
          Retry
        </Text>
      </Pressable>
    </View>
  );
};
