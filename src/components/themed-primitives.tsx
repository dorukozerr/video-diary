import { PropsWithChildren } from 'react';
import {
  View as RNView,
  Text as RNText,
  ViewProps,
  TextProps
} from 'react-native';

export const View = ({
  children,
  className,
  ...props
}: PropsWithChildren<ViewProps>) => (
  <RNView className={`bg-background ${className}`} {...props}>
    {children}
  </RNView>
);

export const Text = ({
  children,
  className,
  ...props
}: PropsWithChildren<TextProps>) => (
  <RNText className={`text-foreground ${className}`} {...props}>
    {children}
  </RNText>
);
