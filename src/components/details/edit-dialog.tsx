import { useEffect } from 'react';
import { TextInput } from 'react-native';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Video } from '@/types';
import { useQueries } from '@/hooks/use-queries';
import { useThemeStore } from '@/stores/theme-store';
import { entrySchema } from '@/utils/schemas';
import { themeTokens } from '@/utils/constants';
import { ActivityIndicator } from '@/components/atoms/activity-indicator';
import { Dialog } from '@/components/ui/dialog';
import { View, Text, Pressable } from '@/components/ui/themed-primitives';

type FormValues = z.infer<typeof entrySchema>;

export const EditDialog = ({
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
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormValues>({
    resolver: zodResolver(entrySchema),
    defaultValues: { name: '', description: '' }
  });
  const {
    updateEntryMutation: { mutateAsync, isPending }
  } = useQueries();

  useEffect(() => {
    reset({ name: entry?.name ?? '', description: entry?.description ?? '' });
  }, [entry, reset]);

  const onSubmit: SubmitHandler<FormValues> = async ({ name, description }) => {
    await mutateAsync({ id: entry?.id ?? '', name, description });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <View className='flex w-full flex-col items-start justify-start gap-6'>
        <View className='flex h-max w-full flex-col items-start justify-start gap-4'>
          <Text className='w-full text-xl font-bold'>Title</Text>
          <Controller
            control={control}
            name='name'
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className='flex w-full flex-row items-start justify-start rounded-md border border-border p-4 text-foreground'
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors['name'] ? (
            <Text className='!text-destructive'>
              {errors?.['name']?.message as string}
            </Text>
          ) : null}
        </View>
        <View className='flex h-max w-full flex-col items-start justify-start gap-4'>
          <Text className='w-full text-xl font-bold'>Description</Text>
          <Controller
            control={control}
            name='description'
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className='flex w-full flex-row items-start justify-start rounded-md border border-border p-4 text-foreground'
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                multiline={true}
                numberOfLines={4}
              />
            )}
          />
          {errors['description'] ? (
            <Text className='!text-destructive'>
              {errors?.['description']?.message as string}
            </Text>
          ) : null}
        </View>
        <View className='flex w-full flex-row items-center justify-end gap-4'>
          <Pressable
            className='rounded-md bg-primary px-4 py-2'
            onPress={onClose}
            disabled={isPending}
          >
            <Text className='text-primary-foreground'>Cancel</Text>
          </Pressable>
          <Pressable
            className='rounded-md bg-primary px-4 py-2'
            onPress={handleSubmit(onSubmit)}
            disabled={isPending}
          >
            {isPending ? (
              <ActivityIndicator
                size={16}
                color={`hsl(${themeTokens[activeTheme]['--primary-foreground']})`}
              />
            ) : (
              <Text className='text-primary-foreground'>Update</Text>
            )}
          </Pressable>
        </View>
      </View>
    </Dialog>
  );
};
