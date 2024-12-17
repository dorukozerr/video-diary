import { TextInput } from 'react-native';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAddEntryStore } from '@/stores/add-entry-store';
import { useQueries } from '@/hooks/use-queries';
import { entrySchema } from '@/utils/schemas';
import { Navigation } from '@/components/add-entry/navigation';
import { View, Text } from '@/components/ui/themed-primitives';

type FormValues = z.infer<typeof entrySchema>;

export const StepThree = () => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: zodResolver(entrySchema),
    defaultValues: { name: '', description: '' }
  });
  const { baseVideo, clipRange } = useAddEntryStore();
  const {
    addEntryMutation: { mutateAsync }
  } = useQueries();

  // TODO: Add toast message maybe?
  const onSubmit: SubmitHandler<FormValues> = async ({ name, description }) =>
    await mutateAsync({ baseVideo, clipRange, name, description });

  return (
    <View className='flex h-full w-full flex-col items-center justify-center'>
      <View className='flex w-full flex-1 flex-col items-start justify-start gap-8 p-4'>
        <View className='flex h-max w-full flex-col items-start justify-start gap-3'>
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
        <View className='flex h-max w-full flex-col items-start justify-start gap-3'>
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
      </View>
      <Navigation onFormSubmit={handleSubmit(onSubmit)} />
    </View>
  );
};
