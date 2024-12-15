import { useState, useEffect, useCallback } from 'react';
import { Platform } from 'react-native';
import {
  requestMediaLibraryPermissionsAsync,
  launchImageLibraryAsync,
  ImagePickerAsset
} from 'expo-image-picker';

export const useAddNewEntryProcess = () => {
  const [processStep, setProcessStep] = useState(0);
  const [baseVideo, setBaseVideo] = useState({ uri: '', duration: 0 });

  const pickAsset = useCallback(async () => {
    try {
      if (Platform.OS !== 'web') {
        const { status } = await requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
          // TODO: Toast message maybe?
          return;
        }
      }

      const result = await launchImageLibraryAsync({
        mediaTypes: ['videos'],
        allowsEditing: false,
        quality: 1
      });

      if (result.canceled) {
        // TODO: Toast message maybe?
        return;
      }

      const { uri, duration } = result.assets[0] as ImagePickerAsset;

      setBaseVideo({ uri, duration: duration ?? 0 });
      setProcessStep(1);
    } catch (error) {
      console.error('pickVideo error =>', error);
    }
  }, []);

  useEffect(() => {
    console.log({ baseVideo });
  }, [baseVideo]);

  return { processStep, setProcessStep, pickAsset, baseVideo };
};
