import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {ReImage} from '../../App.tsx';
import {LinearTransition, useSharedValue} from 'react-native-reanimated';

const {width} = Dimensions.get('window');

export interface IDynamicImage {
  uri: string;
  onHeightChange?: (height: number) => void;
}

export interface IDynamicImageProps {
  height: number;
}
const DynamicImage = forwardRef(
  ({uri = '', onHeightChange}: IDynamicImage, ref) => {
    const heights = useSharedValue(0);
    useImperativeHandle(ref, () => ({height: heights}));

    return (
      <ReImage
        layout={LinearTransition.springify().damping(15)}
        onLoad={event => {
          const cal =
            (width * event.nativeEvent.height) / event.nativeEvent.width;
          heights.value = cal;
          onHeightChange?.(cal);
        }}
        resizeMode={'contain'}
        style={[styles.imageHeader, {height: heights}]}
        source={{
          uri,
          priority: FastImage.priority.normal,
          cache: FastImage.cacheControl.immutable,
        }}
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
