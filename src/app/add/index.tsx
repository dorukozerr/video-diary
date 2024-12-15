import { useAddNewEntryProcess } from '@/hooks/use-add-new-entry-process';
import { View, Text } from '@/components/ui/themed-primitives';

const Page = () => {
  const { processStep } = useAddNewEntryProcess();

  return (
    <View>
      <Text>Create Entry</Text>
      <Text>Process step {processStep}</Text>
    </View>
  );
};

export default Page;
