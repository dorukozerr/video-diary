import { Navigation } from '@/components/add-entry/navigation';
import { View, Text } from '@/components/ui/themed-primitives';

export const StepThree = () => (
  <View className='flex h-full w-full flex-col items-center justify-center'>
    <View className='w-full flex-1'>
      <Text className='text-base font-bold'>Add Metadata</Text>
    </View>
    <Navigation />
  </View>
);
