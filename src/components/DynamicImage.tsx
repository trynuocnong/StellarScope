import React, {forwardRef, useImperativeHandle} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import FastImage, {OnLoadEvent} from 'react-native-fast-image';
import {ReImage} from '../../App.tsx';
import {LinearTransition, useSharedValue} from 'react-native-reanimated';

const {width} = Dimensions.get('window');

export interface IDynamicImage {
  uri: string;
  onHeightChange?: (height: number) => void;
}

const DynamicImage = forwardRef(
  ({uri = '', onHeightChange}: IDynamicImage, ref) => {
    const heights = useSharedValue(0);
    useImperativeHandle(ref, () => ({height: heights}));

    const calculate = (event: OnLoadEvent) => {
      const cal =
        (width * event.nativeEvent.height) / event.nativeEvent.width;
      heights.value = cal;
      onHeightChange?.(cal);
    };

    const onError = () => {
      heights.value = 0;
      onHeightChange?.(0);
    };

    return (
      <ReImage
        layout={LinearTransition.springify().damping(15)}
        onLoad={calculate}
        onError={onError}
        resizeMode={'contain'}
        style={[styles.imageHeader, {height: heights}]}
        source={{uri}}
      />
    );
  },
);

export default React.memo(DynamicImage);

const styles = StyleSheet.create({
  imageHeader: {
    width,
  },
});
