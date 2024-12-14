import { Text, View } from 'react-native';
// import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';

import '../../tailwind.css';

const Root = () => (
  <View>
    <Text className='text-7xl'>
      Open up App.tsx to start working on your app!
    </Text>
    <StatusBar style='auto' />
  </View>
);

export default Root;

// registerRootComponent(App);
