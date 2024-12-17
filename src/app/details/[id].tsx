import { Fragment, useState } from 'react';
import { ScrollView } from 'react-native';
import { usePathname } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';
import { Trash, Pen } from 'lucide-react-native';
import { Video } from '@/types';
import { useQueries } from '@/hooks/use-queries';
import { useThemeStore } from '@/stores/theme-store';
import { themeTokens } from '@/utils/constants';
import { EditDialog } from '@/components/details/edit-dialog';
import { DeleteDialog } from '@/components/details/delete-dialog';
import { ActivityIndicator } from '@/components/atoms/activity-indicator';
import { View, Text, Pressable } from '@/components/ui/themed-primitives';

interface DialogProps {
  open: boolean;
  entry: Video | null;
}

const Page = () => {
  const pathname = usePathname();
  const entryId = pathname.split('/')[2] ?? '';
  const { useGetEntryQuery } = useQueries();
  const activeTheme = useThemeStore((state) => state.activeTheme);
  const { isPending, data } = useGetEntryQuery(entryId);
  const [editDialogState, setEditDialogState] = useState<DialogProps>({
    open: false,
    entry: null
  });
  const [deleteDialogState, setDeleteDialogState] = useState<DialogProps>({
    open: false,
    entry: null
  });

  const player = useVideoPlayer(data?.uri ?? '', (player) => {
    player.loop = true;
    player.play();
  });

  return isPending ? (
    <View className='flex h-full w-full items-center justify-center'>
      <ActivityIndicator />
    </View>
  ) : !data ? (
    <View className='flex h-full w-full items-center justify-center'>
      <Text>Entry Data not found</Text>
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
          <Text className='text-3xl font-bold'>{data.name}</Text>
          <Text className='text-lg text-muted-foreground'>
            {data.description}
          </Text>
          <View className='flex w-full flex-row items-center justify-between'>
            <Text className='text-sm text-muted-foreground'>
              {new Date(data.created_at ?? 0).toLocaleString()}
            </Text>
            <View className='flex flex-row items-center justify-center gap-4'>
              <Pressable
                className='rounded-full bg-foreground p-2'
                onPress={() => setEditDialogState({ open: true, entry: data })}
              >
                <Pen
                  size={16}
                  color={`hsl(${themeTokens[activeTheme]['--primary-foreground']})`}
                />
              </Pressable>
              <Pressable
                className='rounded-full bg-foreground p-2'
                onPress={() =>
                  setDeleteDialogState({ open: true, entry: data })
                }
              >
                <Trash
                  size={16}
                  color={`hsl(${themeTokens[activeTheme]['--primary-foreground']})`}
                />
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
      <EditDialog
        open={editDialogState.open}
        onClose={() => setEditDialogState({ open: false, entry: null })}
        entry={editDialogState.entry}
      />
      <DeleteDialog
        open={deleteDialogState.open}
        onClose={() => setDeleteDialogState({ open: false, entry: null })}
        entry={deleteDialogState.entry}
      />
    </Fragment>
  );
};

export default Page;
