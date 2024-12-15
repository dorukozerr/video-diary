import { useQueries } from '@/hooks/use-queries';
import { View } from '@/components/ui/themed-primitives';
import { ActivityIndicator } from '@/components/atoms/activity-indicator';
import { ErrorView } from '@/components/root/error-view';
import { EntriesList } from '@/components/root/entries-list';

const Page = () => {
  const { getAllEntriesQuery } = useQueries();
  const { isFetching, isError, isSuccess, data: entries } = getAllEntriesQuery;

  return (
    <View className='h-full w-full'>
      {isFetching ? (
        <View className='flex h-full w-full flex-col items-center justify-center'>
          <ActivityIndicator />
        </View>
      ) : isError ? (
        <ErrorView />
      ) : isSuccess ? (
        <EntriesList entries={entries} />
      ) : null}
    </View>
  );
};

export default Page;
