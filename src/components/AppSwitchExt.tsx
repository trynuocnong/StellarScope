import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import Animated, {
  LinearTransition,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {RePressable} from '../../App.tsx';
import {COLORS} from '../utils/resources/colors.ts';
import {SwitchRefProps} from './AppSwitchFunc.tsx';

const AppSwitchExt = ({checked, updateChecked}: SwitchRefProps) => {
  const translateX = useSharedValue(2); // initial position

  useEffect(() => {
    translateX.value = withTiming(checked ? 30 : 3);
  }, [checked, translateX]);

  const thumbAnimated = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}],
    backgroundColor: withTiming(
      checked ? COLORS.accent['300'] : COLORS.neutral['300'],
    ),
  }));

  const containerAnimated = useAnimatedStyle(() => ({
    backgroundColor: withTiming(
      checked ? COLORS.primary['300'] : COLORS.neutral['700'],
    ),
  }));

  return (
    <RePressable
      onPress={updateChecked}
      style={[styles.container, containerAnimated]}>
      <Animated.View
        layout={LinearTransition.springify().damping(15)}
        style={[styles.thumb, thumbAnimated]}
      />
    </RePressable>
  );
};

export default React.memo(AppSwitchExt);

const styles = StyleSheet.create({
  thumb: {
    width: 20,
    height: 20,
    top: 3,
    borderRadius: 15,
    position: 'absolute',
  },
  container: {
    width: 50,
    height: 26,
    borderRadius: 30,
    padding: 3,
  },
});
