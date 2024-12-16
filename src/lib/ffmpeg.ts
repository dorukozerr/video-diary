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
    const duration = (endMs - startMs) / 1000;

    const outputFileName = `cropped-${Date.now()}.mp4`;
    const outputPath = `${documentDirectory}${outputFileName}`;

    const command = `-i "${videoUri}" -ss ${startTime} -t ${duration} -c copy "${outputPath}"`;
    const result = await FFmpegKit.execute(command);

    if ((await result.getReturnCode()).getValue() === 0) {
      return outputPath;
    } else {
      const logs = await result.getLogs();

      throw new Error(`FFmpeg process failed: ${logs}`);
    }
  } catch (error) {
    console.error('Error cropping video:', error);

    throw error;
  }
};
