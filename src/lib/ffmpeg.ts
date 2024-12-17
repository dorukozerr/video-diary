import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';
import { FFmpegKit } from 'ffmpeg-kit-react-native';
import { documentDirectory } from 'expo-file-system';

export const cropVideo = async ({
  videoUri,
  clipRange
}: {
  videoUri: string;
  clipRange: [number, number];
}) => {
  try {
    const [startMs, endMs] = clipRange;

    const startTime = new Date(startMs).toISOString().slice(11, 23);

    const outputPath = `${documentDirectory}${`cropped-${uuid()}.mp4`}`;

    const result = await FFmpegKit.execute(
      `-i "${videoUri}" -ss ${startTime} -t ${(endMs - startMs) / 1000} -c copy "${outputPath}"`
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
