import { useAddEntryStore } from '@/stores/add-entry-store';
import { StepOne } from '@/components/add-entry/step-one';
import { StepTwo } from '@/components/add-entry/step-two';
import { StepThree } from '@/components/add-entry/step-three';
import { View } from '@/components/ui/themed-primitives';

const Page = () => {
  const step = useAddEntryStore((state) => state.step);

  const steps = {
    0: <StepOne />,
    1: <StepTwo />,
    2: <StepThree />
  };

  return (
    <View className='h-full w-full flex-1 items-center justify-center bg-red-800'>
      {steps[step]}
    </View>
  );
};

export default Page;
