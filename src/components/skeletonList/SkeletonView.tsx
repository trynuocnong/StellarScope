import React from "react";
import {StyleProp, View, ViewStyle} from 'react-native';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const SkeletonView = ({ style }: {style: StyleProp<ViewStyle>}) => {
  return (
    <SkeletonPlaceholder>
      <View style={style} />
    </SkeletonPlaceholder>
  );
};

export default SkeletonView;
