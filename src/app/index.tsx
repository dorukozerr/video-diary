import { ScrollView } from 'react-native';
import { View } from '@/components/themed-primitives';
import { EntryCard } from '@/components/entry-card';

const Root = () => (
  <View className='h-full w-full'>
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

export default Root;
