import { TextInput } from 'react-native';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAddEntryStore } from '@/stores/add-entry-store';
import { Navigation } from '@/components/add-entry/navigation';
import { View, Text } from '@/components/ui/themed-primitives';
import { useFFmpeg } from '@/hooks/use-ffmpeg';

const schema = z.object({
  title: z
    .string()
    .min(5, { message: 'Title must be at least 5 characters long' })
    .max(150, { message: 'Title can be maximum 150 characters long.' }),
  description: z
    .string()
    .min(5, { message: 'Description must be at least 5 characters long.' })
    .max(250, { message: 'Description can be maximum 250 characters long.' })
});

type FormValues = z.infer<typeof schema>;

export const StepThree = () => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: zodResolver(schema)
  });
  const { baseVideo, clipRange } = useAddEntryStore();
  const { cropVideo } = useFFmpeg();

  const onSubmit: SubmitHandler<FormValues> = (values) => {
    cropVideo({ assetUri: baseVideo.uri });
  };

  return (
    <View className='flex h-full w-full flex-col items-center justify-center'>
      <View className='flex w-full flex-1 flex-col items-start justify-start gap-8 p-4'>
        <View className='flex h-max w-full flex-col items-start justify-start gap-3'>
          <Text className='w-full text-xl font-bold'>Title</Text>
          <Controller
            control={control}
            name='title'
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className='flex w-full flex-row items-start justify-start rounded-md border border-border p-4'
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder='Enter the title for diary entry.'
              />
            )}
          />
          {errors['title'] ? (
            <Text className='!text-destructive'>
              {errors?.['title']?.message as string}
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
                className='flex w-full flex-row items-start justify-start rounded-md border border-border p-4'
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder='Enter the title for diary entry.'
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
