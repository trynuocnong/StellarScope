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

  // Start the animation when the component mountsd
  useEffect(() => {
    onGoingValue.value = withRepeat(withTiming(1, { duration: 1000 }), -1, true);
    //eslint-disable-next-line
  }, []);

  const skeletonStyles = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      onGoingValue.value, // Use the animated shared value here
      [0, 0.25, 0.5, 0.75, 1],
      [
        COLORS.neutral['1000'], // #333333 - Darkest
        COLORS.neutral['900'],  // #4a4a4a
        COLORS.neutral['800'],  // #606060
        COLORS.neutral['700'],  // #777777
        COLORS.neutral['600'],  // #8e8e8e - Lightest
      ],
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
