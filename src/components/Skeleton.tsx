import React, {ReactNode, useEffect} from 'react';
import {StyleSheet, View, ViewProps} from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import {COLORS} from '../utils/resources/colors.ts';

export default function ({ children, style }: { children?: ReactNode, style?: ViewProps['style'] }) {
  const onGoingValue = useSharedValue(0);

  // Start the animation when the component mounts
  useEffect(() => {
    onGoingValue.value = withRepeat(withTiming(1, { duration: 3000 }), -1, false);
    //eslint-disable-next-line
  }, []);

  const skeletonStyles = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      onGoingValue.value, // Use the animated shared value here
      [0, 0.25, 0.5, 0.75, 1],
      // ['#fff', '#d8d8d8', '#cacaca', '#e1dfdf', '#fff'],
      [COLORS.primary['100'], COLORS.primary['300'], COLORS.primary['500'], COLORS.primary['200'], COLORS.primary['100']],
    ),
  }));

  return (
    <Animated.View style={[styles.container, style, skeletonStyles]}>
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
