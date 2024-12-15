import { PropsWithChildren, forwardRef } from 'react';
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

export const View = forwardRef<RNView, PropsWithChildren<ViewProps>>(
  ({ children, className, ...props }, ref) => (
    <RNView ref={ref} className={`bg-background ${className}`} {...props}>
      {children}
    </RNView>
  )
);
View.displayName = 'View';

export const Text = forwardRef<RNText, PropsWithChildren<TextProps>>(
  ({ children, className, ...props }, ref) => (
    <RNText ref={ref} className={`text-foreground ${className}`} {...props}>
      {children}
    </RNText>
  )
);
Text.displayName = 'Text';

export const Pressable = forwardRef<RNView, PropsWithChildren<PressableProps>>(
  ({ children, className, ...props }, ref) => (
    <RNPressable
      ref={ref}
      className={`text-foreground ${className}`}
      {...props}
    >
      {children}
    </RNPressable>
  )
);
Pressable.displayName = 'Pressable';
