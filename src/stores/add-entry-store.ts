import { create } from 'zustand';
import { Platform } from 'react-native';
import {
  requestMediaLibraryPermissionsAsync,
  launchImageLibraryAsync,
  ImagePickerAsset
} from 'expo-image-picker';

interface ProcessState {
  step: 0 | 1 | 2;
  baseVideo: { uri: string; duration: number };
  setStep: (step: 0 | 1 | 2) => void;
  pickAsset: () => Promise<void>;
}

export const useAddEntryStore = create<ProcessState>((set) => ({
  step: 0,
  baseVideo: { uri: '', duration: 0 },
  setStep: (step) => set({ step }),
  pickAsset: async () => {
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

      set({
        baseVideo: { uri, duration: duration ?? 0 },
        step: 1
      });
    } catch (error) {
      // TODO: Toast message maybe?
      console.error('pickVideo error =>', error);
    }
  }
}));
