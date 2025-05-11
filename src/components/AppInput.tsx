import React from 'react';
import {
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import {COLORS} from '../utils/resources/colors.ts';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export type AppTitleType = 'outside' | 'inside' | 'left' | 'right' | 'none';

export type AppInputProps = {
  containerStyle?: StyleProp<ViewStyle>;
  title?: string;
  titleType?: AppTitleType;
  leadIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
} & TextInputProps;

export type AppInputTitleProps = {
  appointType: AppTitleType;
  visionary: AppTitleType;
  title?: string;
};

const RenderTile = ({appointType, visionary, title}: AppInputTitleProps) => {
  if (!title || appointType === 'none' || visionary !== appointType) {
    return <></>;
  }

  const textElement = <Text style={styles.titleText}>{title}</Text>;
  switch (appointType) {
    case 'outside':
      return <View style={styles.outsideTitle}>{textElement}</View>;
    case 'left':
      return <View style={styles.leftTitle}>{textElement}</View>;
    case 'right':
      return <View style={styles.rightTitle}>{textElement}</View>;
    default:
      return <></>;
  }
};
const AppInput = ({
  style,
  containerStyle,
  placeholderTextColor = COLORS.neutral['600'],
  leadIcon = <></>,
  trailingIcon = <></>,
  title,
  titleType = 'outside',
  value,
  defaultValue,
  onFocus,
  onBlur,
  ...rest
}: AppInputProps) => {
  const isFocused = useSharedValue(0);
  const animatedLabelStyle = useAnimatedStyle(() => {
    const top = interpolate(
      isFocused.value ||
        Number(value !== '' && value !== undefined && value !== null),
      [0, 1],
      [20, 4],
    );
    const fontSize = interpolate(
      isFocused.value ||
        Number(value !== '' && value !== undefined && value !== null),
      [0, 1],
      [16, 12],
    );
    return {
      position: 'absolute',
      left: 12,
      top,
      fontSize,
      color: COLORS.neutral['600'],
      paddingHorizontal: 4,
    };
  });

  if (titleType === 'inside') {
    const _onFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      isFocused.value = withTiming(Number(Boolean(value)));
      onFocus?.(e);
    };
    const _onBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      isFocused.value = withTiming(Number(Boolean(value)));
      onBlur?.(e);
    };
    return (
      <View style={[styles.inputWrapper, styles.absolute, containerStyle]}>
        {leadIcon}
        <Animated.Text style={animatedLabelStyle}>{title}</Animated.Text>
        <TextInput
          {...rest}
          value={value}
          defaultValue={defaultValue}
          onFocus={_onFocus}
          onBlur={_onBlur}
          style={[styles.input, styles.insideStyleInput, style]}
          placeholder=""
          placeholderTextColor="transparent"
        />
        {trailingIcon}
      </View>
    );
  }

  return (
    <View style={containerStyle}>
      <RenderTile appointType={'outside'} visionary={titleType} title={title} />
      <View style={styles.inputWrapper}>
        {leadIcon}
        <RenderTile appointType={'left'} visionary={titleType} title={title} />
        <TextInput
          {...rest}
          style={[styles.input, style]}
          placeholderTextColor={placeholderTextColor}
        />
        <RenderTile appointType={'right'} visionary={titleType} title={title} />
        {trailingIcon}
      </View>
    </View>
  );
};

export default AppInput;

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.neutral['1000'],
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.neutral['800'],
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    color: COLORS.neutral['100'],
  },
  titleText: {
    color: COLORS.neutral['100'],
    fontSize: 14,
    marginBottom: 4,
  },
  outsideTitle: {
    marginBottom: 4,
  },
  leftTitle: {
    marginLeft: 8,
    justifyContent: 'center',
  },
  rightTitle: {
    marginRight: 8,
    justifyContent: 'center',
  },
  absolute: {position: 'relative'},
  insideStyleInput: {paddingTop: 18, paddingBottom: 6},
});
