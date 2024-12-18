import { useState, useEffect } from 'react';
import { Image, Platform } from 'react-native';
import { getContentUriAsync } from 'expo-file-system';
import { Link } from 'expo-router';
import { getThumbnailAsync } from 'expo-video-thumbnails';
import { Video } from '@/types';
import { Pressable, View, Text } from '@/components/ui/themed-primitives';

export const EntryCard = ({
  entry: { id, name, description, uri }
}: {
  entry: Video;
}) => {
  const [image, setImage] = useState('');

  const generateThumbnail = async (videoUri: string) => {
    try {
      let inputUri = videoUri;

      if (Platform.OS === 'android') {
        inputUri = await getContentUriAsync(videoUri);
      }

      const { uri } = await getThumbnailAsync(inputUri);

      setImage(uri);
    } catch (e) {
      console.warn(e);
    }
  };

  useEffect(() => {
    uri && generateThumbnail(uri);
  }, [uri]);

  return (
    <Link href={`/details/${id}`} asChild>
      <Pressable className='flex h-32 flex-row items-center justify-center overflow-hidden rounded-md border border-border'>
        <View className='h-full w-32 bg-muted'>
          {image ? (
            <Image
              style={{ width: '100%', height: '100%' }}
              source={{ uri: image }}
            />
          ) : null}
        </View>
        <View className='flex h-full flex-1 flex-col items-start justify-center p-3'>
          <Text numberOfLines={1} className='text-2xl'>
            {name}
          </Text>
          <Text numberOfLines={2} className='w-full truncate text-base'>
            {description}
          </Text>
        </View>
      </Pressable>
    </Link>
  );
};
