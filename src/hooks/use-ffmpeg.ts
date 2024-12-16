import { useCallback } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
// import 'react-native-get-random-values';
// import { v4 as uuid } from 'uuid';

export const useFFmpeg = () => {
  const cropVideo = useCallback(async ({ assetUri }: { assetUri: string }) => {
    const ffmpeg = new FFmpeg();

    if (!ffmpeg.loaded) await ffmpeg.load();

    //const duration = '5';
    // const outputName = `${uuid()}.mp4`;

    //  ffmpeg.writeFile(inputName, videoUri);

    const asset = await ffmpeg.readFile(assetUri);

    console.log('ffmpeg asset =>', asset);

    // await ffmpeg.exec([
    //   '-i',
    //   inputName,
    //   '-ss',
    //   startTime.toString(),
    //   '-t',
    //   duration,
    //   '-c',
    //   'copy',
    //   outputName
    // ]);

    // return new Blob([data.buffer], {
    //   type: 'video/mp4',
    //   lastModified: new Date().getTime()
    // });
  }, []);

  return { cropVideo };
};
