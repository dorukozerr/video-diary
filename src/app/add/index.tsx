import { getAll, addEntry, deleteAll } from '@/lib/db';
import { View, Text, Pressable } from '@/components/themed-primitives';

const Page = () => (
  <View>
    <Text>Create Entry</Text>
    <Pressable
      onPress={async () => {
        const res = await getAll();
        console.log(res);
      }}
    >
      <Text>getAll</Text>
    </Pressable>
    <Pressable
      onPress={async () => {
        const res = await addEntry({
          name: 'testName',
          description: 'testDescription',
          uri: 'testUri',
          duration: 10
        });
        console.log(res);
      }}
    >
      <Text>addEntry</Text>
    </Pressable>
    <Pressable
      onPress={async () => {
        const res = await deleteAll();
        console.log(res);
      }}
    >
      <Text>addEntry</Text>
    </Pressable>
  </View>
);

export default Page;
