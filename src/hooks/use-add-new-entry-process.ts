import { useState, useCallback } from 'react';
import { Platform } from 'react-native';
import {
  requestMediaLibraryPermissionsAsync,
  launchImageLibraryAsync,
  ImagePickerAsset
} from 'expo-image-picker';

export const useAddNewEntryProcess = () => {
  const [processStep, setProcessStep] = useState(0);
  const [rawVideoData, setRawVideoData] = useState({ uri: '', duration: 0 });

  const pickAsset = useCallback(async () => {
    try {
      if (Platform.OS !== 'web') {
        const { status } = await requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
          throw new Error('Permission to access media library was denied');
        }
      }

      const result = await launchImageLibraryAsync({
        mediaTypes: ['videos'],
        allowsEditing: false,
        quality: 1
      });

      if (result.canceled) {
        throw new Error('User cancelled video selection process');
      }

      const { uri, duration } = result.assets[0] as ImagePickerAsset;

      setRawVideoData({ uri, duration: duration ?? 0 });
      setProcessStep(1);
    } catch (error) {
      console.error('pickVideo error =>', error);
    }
  }, []);

  return { processStep, setProcessStep, pickAsset, rawVideoData };
};
