import React, {useMemo} from 'react';
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {KeyValue} from '../navigation';

export type SegmentControllerProps = {
  options: KeyValue[];
  style?: StyleProp<ViewStyle>;
  incompatibleSpace?: number;
  layerColor: string;
  textColor: string;
  onSelect?: (str: KeyValue) => void;
};

const currentWidth = Dimensions.get('window').width;

const SegmentButtonRow = ({
  options,
  layerColor,
  style,
  onSelect = () => {},
  textColor,
  incompatibleSpace = 0,
}: SegmentControllerProps) => {
  const selectedIndex = useSharedValue(0);

  const layerWidth = useMemo(() => {
    return options.length > 3
      ? (currentWidth - incompatibleSpace - 4) / 3
      : (currentWidth - incompatibleSpace - 4) / options.length;
  }, [incompatibleSpace, options.length]);

  const animatedLayerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(
            selectedIndex.value === 0 ? 4 : selectedIndex.value * layerWidth,
            {
              duration: 250,
            },
          ),
        },
      ],
    };
  }, [layerWidth]);

  const handlePress = (index: number) => {
    selectedIndex.value = index;
    onSelect(options[index]);
  };

  return (
    <View style={style}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={[styles.container, styles.padH2]}>
          <Animated.View
            style={[
              styles.layer,
              {width: layerWidth, backgroundColor: layerColor},
              animatedLayerStyle,
            ]}
          />
          {options.map((item, i) => (
            <Pressable key={i} onPress={() => handlePress(i)}>
              <Text
                style={StyleSheet.flatten([
                  styles.text,
                  {width: layerWidth, color: textColor},
                ])}>
                {item.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default SegmentButtonRow;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'relative',
  },
  padH2: {
    paddingHorizontal: 4,
  },
  layer: {
    position: 'absolute',
    top: '10%',
    bottom: '10%',
    backgroundColor: 'red',
    borderRadius: 8,
  },
  text: {
    textAlignVertical: 'center',
    textAlign: 'center',
    flex: 1,
  },
});
