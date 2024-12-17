import { Platform } from 'react-native';
import {
  requestMediaLibraryPermissionsAsync,
  launchImageLibraryAsync,
  ImagePickerAsset
} from 'expo-image-picker';
import { create } from 'zustand';

interface ProcessState {
  step: 0 | 1 | 2;
  baseVideo: { fileName: string; duration: number; uri: string };
  setStep: (step: 0 | 1 | 2) => void;
  errorMessage: string;
  isPending: boolean;
  pickAsset: () => Promise<void>;
  clipRange: [number, number];
  setClipRange: (newRange: [number, number]) => void;
  resetProcessState: () => void;
}

export const useAddEntryStore = create<ProcessState>((set) => ({
  step: 0,
  baseVideo: { fileName: '', duration: 0, uri: '' },
  setStep: (step) => set({ step }),
  errorMessage: '',
  isPending: false,
  pickAsset: async () => {
    try {
      set({
        baseVideo: { fileName: '', duration: 0, uri: '' },
        isPending: true,
        clipRange: [0, 5000]
      });

      if (Platform.OS !== 'web') {
        const { status } = await requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
          set({
            errorMessage: 'Please grant access to continue',
            isPending: false
          });

          return;
        }
      }

      const result = await launchImageLibraryAsync({
        mediaTypes: ['videos'],
        allowsEditing: false,
        quality: 1
      });

      if (result.canceled) {
        set({ errorMessage: 'No file has been choosen', isPending: false });

        return;
      }

      const { uri, duration, fileName } = result.assets[0] as ImagePickerAsset;

      // Next two if statements are overthinked edge case covareges, but TS is complaning
      // when not add them. It complains about filename and duration might be  undefined
      // or null. Added 5000 milliseconds check just because task requirements says video
      // must be cropped in 5 second range.

      if (!fileName) {
        set({
          errorMessage: 'File name cannot be undefined',
          isPending: false
        });

        return;
      }

      if (!duration || duration < 5000) {
        set({ errorMessage: 'Asset is too short', isPending: false });

        return;
      }

      set({
        step: 1,
        baseVideo: { fileName, duration, uri },
        errorMessage: '',
        isPending: false
      });
    } catch (error) {
      set({ errorMessage: 'Unknown error happened', isPending: false });

      console.error('pickAsset error =>', error);
    }
  },
  clipRange: [0, 5000],
  setClipRange: (newRange) => set({ clipRange: newRange }),
  resetProcessState: () =>
    set({
      baseVideo: { uri: '', fileName: '', duration: 0 },
      step: 0,
      clipRange: [0, 5000]
    })
}));
