import { TestComponent } from '@/components/test-component';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

export const App = () => (
  <View style={styles.container}>
    <TestComponent />
    <StatusBar style='auto' />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
