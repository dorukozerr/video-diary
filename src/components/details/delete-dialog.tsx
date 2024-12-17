import { Video } from '@/types';
import { useQueries } from '@/hooks/use-queries';
import { useThemeStore } from '@/stores/theme-store';
import { themeTokens } from '@/utils/constants';
import { ActivityIndicator } from '@/components/atoms/activity-indicator';
import { Dialog } from '@/components/ui/dialog';
import { View, Text, Pressable } from '@/components/ui/themed-primitives';

export const DeleteDialog = ({
  open,
  onClose,
  entry
}: {
  open: boolean;
  onClose: () => void;
  entry: Video | null;
}) => {
  const activeTheme = useThemeStore((state) => state.activeTheme);
  const {
    deleteEntryMutation: { mutateAsync, isPending }
  } = useQueries();

  const handleDelete = async () => {
    await mutateAsync(entry?.id ?? '');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <View className='flex flex-col items-start justify-start gap-4'>
        <Text className='text-xl font-semibold'>Delete Video Entry</Text>
        <Text className='text-muted-foreground'>
          Are you sure you want to delete "{entry?.name}"? This action cannot be
          undone and will permanently remove this video entry from your diary.
        </Text>
        <View className='mt-2 flex w-full flex-row items-center justify-end gap-4'>
          <Pressable
            onPress={onClose}
            className='rounded-lg bg-primary px-4 py-2'
          >
            <Text className='text-primary-foreground'>Cancel</Text>
          </Pressable>
          <Pressable
            className='flex items-center justify-center rounded-lg bg-destructive px-4 py-2'
            onPress={handleDelete}
          >
            {isPending ? (
              <ActivityIndicator
                color={`hsl(${themeTokens[activeTheme]['--primary-foreground']})`}
              />
            ) : (
              <Text className='font-medium text-white'>Delete Entry</Text>
            )}
          </Pressable>
        </View>
      </View>
    </Dialog>
  );
};
