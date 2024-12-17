import { ActivityIndicator as RNActivityIndicator } from 'react-native';
import { useThemeStore } from '@/stores/theme-store';
import { themeTokens } from '@/utils/constants';

export const ActivityIndicator = (
  props: React.ComponentPropsWithoutRef<typeof RNActivityIndicator>
) => {
  const activeTheme = useThemeStore((state) => state.activeTheme);

  return (
    <RNActivityIndicator
      color={`hsl(${themeTokens[activeTheme]['--foreground']})`}
      size={16}
      {...props}
    />
  );
};
