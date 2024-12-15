import { useState } from 'react';
import { RangeSlider } from '@react-native-assets/slider';
import { useThemeStore } from '@/stores/theme-store';
import { useAddEntryStore } from '@/stores/add-entry-store';
import { themeTokens } from '@/utils/constants';
import { millisToSeconds } from '@/utils/helpers';
import { View, Text } from '@/components/ui/themed-primitives';

export const Scrubber = () => {
  const [values, setValues] = useState<[number, number]>([0, 0]);
  const activeTheme = useThemeStore((state) => state.activeTheme);
  const baseVideo = useAddEntryStore((state) => state.baseVideo);

  const test = () => {
    setValues([1000, 6000]);
  };

  return (
    <View className='h-full w-full flex-col items-center justify-center'>
      <Text onPress={test}>Click</Text>
      <RangeSlider
        range={values} // set the current slider's value
        minimumValue={0}
        minimumRange={0} // Minimum value (defaults as 0)
        maximumValue={baseVideo.duration} // Maximum value (defaults as minimumValue + step)
        step={0} // The step for the slider (0 means that the slider will handle any decimal value within the range [min, max])
        thumbTintColor='darkcyan' // The color of the slider's thumb
        thumbStyle={{
          backgroundColor: `hsl(${themeTokens[activeTheme]['--primary']})`
        }}
        trackStyle={{
          backgroundColor: `hsl(${themeTokens[activeTheme]['--muted']})`
        }} // Override the tracks' style
        minTrackStyle={{ backgroundColor: 'red' }} // Override the tracks' style for the minimum range
        maxTrackStyle={{ backgroundColor: 'green' }} // Override the tracks' style for the maximum range
        enabled={true} // If false, the slider won't respond to touches anymore
        trackHeight={10} // The track's height in pixel
        thumbSize={30} // The thumb's size in pixel
        slideOnTap={true} // If true, touching the slider will update it's value. No need to slide the thumb.
        onValueChange={(val) => {
          const [newMin, newMax] = val;
          console.log('onValueChange invoked =>', values);

          if (newMin !== values[0]) {
            setValues([newMin, Math.min(baseVideo.duration, newMin + 5000)]);
          } else if (newMax !== values[1]) {
            setValues([Math.max(0, newMax - 5000), newMax]);
          }
        }} // Called each time the value changed. Return false to prevent the value from being updated. The type is (value: number) => boolean | void
        onSlidingStart={undefined} // Called when the slider is pressed. The type is (value: number) => void
        onSlidingComplete={undefined} // Called when the press is released. The type is (value: number) => void
        style={{ width: '100%' }}
      />
    </View>
  );
};
