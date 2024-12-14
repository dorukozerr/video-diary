import { View, Text } from 'react-native';
import { Slot, Link } from 'expo-router';

const Layout = () => (
  <View className='flex h-full w-full flex-col items-start justify-start bg-red-500'>
    <View className='w-full flex-1 border border-red-100 p-4 pt-16'>
      <Slot />
    </View>
    <View className='flex h-24 w-full flex-row items-center justify-center gap-4 bg-red-300'>
      <Text>Navbar</Text>
      <Text>Navbar</Text>
    </View>
  </View>
);

export default Layout;
