import { PropsWithChildren } from 'react';
import {
  SafeAreaView as RNSaveAreaView,
  View as RNView,
  Text as RNText,
  Pressable as RNPressable,
  ViewProps,
  TextProps,
  PressableProps
} from 'react-native';

export const SafeAreaView = ({
  children,
  className,
  ...props
}: PropsWithChildren<ViewProps>) => (
  <RNSaveAreaView className={`bg-background ${className}`} {...props}>
    {children}
  </RNSaveAreaView>
);

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

export const Pressable = ({
  children,
  className,
  ...props
}: PropsWithChildren<PressableProps>) => (
  <RNPressable className={`text-foreground ${className}`} {...props}>
    {children}
  </RNPressable>
);
