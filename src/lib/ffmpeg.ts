import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';
import { FFmpegKit } from 'ffmpeg-kit-react-native';
import { documentDirectory } from 'expo-file-system';
import { millisToSeconds } from '@/utils/helpers';

export const cropVideo = async ({
  videoUri,
  clipRange
}: {
  videoUri: string;
  clipRange: [number, number];
}) => {
  try {
    const [startMs, endMs] = clipRange;

    const outputPath = `${documentDirectory}${`cropped-${uuid()}.mp4`}`;

    const result = await FFmpegKit.execute(
      `-i "${videoUri}" -ss ${millisToSeconds(startMs)} -t ${millisToSeconds(endMs - startMs)} -f mp4 -c copy "${outputPath}"`
    );

    const isSuccess = (await result.getReturnCode()).isValueSuccess();

    return isSuccess
      ? { success: true, videoUri: outputPath }
      : { success: false };
  } catch (error) {
    console.error('Error cropping video:', error);

    return { success: false };
  }
};
