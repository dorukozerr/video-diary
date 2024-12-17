import { Fragment, useState } from 'react';
import { ScrollView } from 'react-native';
import { usePathname } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';
import { Trash, Pen } from 'lucide-react-native';
import { useQueries } from '@/hooks/use-queries';
import { ActivityIndicator } from '@/components/atoms/activity-indicator';
import { View, Text, Pressable } from '@/components/ui/themed-primitives';
import { Dialog } from '@/components/ui/dialog';

const Page = () => {
  const pathname = usePathname();
  const entryId = pathname.split('/')[2] ?? '';
  const { useGetEntryQuery } = useQueries();
  const { isPending, data } = useGetEntryQuery(entryId);
  const [editDialogState, setEditDialogState] = useState({ open: false });
  const [deleteDialogState, setDeleteDialogState] = useState({ open: false });

  const player = useVideoPlayer(data?.uri ?? '', (player) => {
    player.loop = true;
    player.play();
  });

  return isPending ? (
    <View className='flex h-full w-full items-center justify-center'>
      <ActivityIndicator />
    </View>
  ) : (
    <Fragment>
      <ScrollView className='w-full'>
        <View className='flex h-full w-full flex-col items-start justify-start gap-4 p-4'>
          <View className='h-80 w-full rounded-md border border-border bg-muted'>
            <VideoView
              player={player}
              style={{ width: '100%', height: '100%' }}
              allowsFullscreen={true}
              nativeControls={false}
            />
          </View>
          <Text className='text-3xl font-bold'>{data?.name}</Text>
          <Text className='text-lg text-muted-foreground'>
            {data?.description}
          </Text>
          <View className='flex w-full flex-row items-center justify-between border border-red-500'>
            <Text className='text-sm text-muted-foreground'>
              {new Date(data?.created_at ?? 0).toLocaleString()}
            </Text>
            <View className='flex flex-row items-center justify-center gap-4'>
              <Pressable onPress={() => setEditDialogState({ open: true })}>
                <Pen />
              </Pressable>
              <Pressable onPress={() => setDeleteDialogState({ open: true })}>
                <Trash />
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
      <Dialog
        open={editDialogState.open}
        onClose={() => setEditDialogState({ open: false })}
      >
        <Text>Edit Dialog</Text>
      </Dialog>
      <Dialog
        open={deleteDialogState.open}
        onClose={() => setDeleteDialogState({ open: false })}
      >
        <Text>Delete Dialog</Text>
      </Dialog>
    </Fragment>
  );
};

export default Page;
