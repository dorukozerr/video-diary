import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

import './tailwind.css';

export const App = () => (
  <View>
    <Text className='text-7xl'>
      Open up App.tsx to start working on your app!
    </Text>
    <StatusBar style='auto' />
  </View>
);
