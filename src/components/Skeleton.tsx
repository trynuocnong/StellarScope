import React, {ReactNode} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

export default function ({children}: {children: ReactNode}) {
  const onGoingValue = useSharedValue(0);

  const skeletonStyles = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      withRepeat((onGoingValue.value = withTiming(1)), -1, true),
      [0, 0.25, 0.5, 0.75, 1],
      ['#fff', '#ccc7c7', '#9a9090', '#d6d6d6', '#fff'],
    ),
  }));

  return (
    <Animated.View style={[styles.container, skeletonStyles]}>
      <View style={styles.hidden}>{children}</View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    alignSelf: 'baseline',
    backgroundColor: 'red',
    borderRadius: 3,
  },
  hidden: {
    opacity: 0,
  },
});
