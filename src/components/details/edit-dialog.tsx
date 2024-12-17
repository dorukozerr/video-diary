import { Video } from '@/types';
import { Dialog } from '@/components/ui/dialog';
import { View, Text, Pressable } from '@/components/ui/themed-primitives';

export const EditDialog = ({
  open,
  onClose,
  entry
}: {
  open: boolean;
  onClose: () => void;
  entry: Video | null;
}) => {
  console.log({ open, onClose, entry });

  return (
    <Dialog open={open} onClose={onClose}>
      <Text>Edit Dialog</Text>
    </Dialog>
  );
};
