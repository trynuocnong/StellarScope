import React, { ReactNode, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

export default function ({ children }: { children: ReactNode }) {
  const onGoingValue = useSharedValue(0);

  // Start the animation when the component mounts
  useEffect(() => {
    onGoingValue.value = withRepeat(withTiming(1, { duration: 2000 }), -1, false);
    //eslint-disable-next-line
  }, []);

  const skeletonStyles = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      onGoingValue.value, // Use the animated shared value here
      [0, 0.25, 0.5, 0.75, 1],
      ['#fff', '#e6e6e6', '#d8d8d8', '#e1dfdf', '#fff'],
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
    borderRadius: 3,
  },
  hidden: {
    opacity: 0,
  },
});
