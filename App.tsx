import {FlashList} from '@shopify/flash-list';

if (__DEV__) {
  require('./ReactotronConfig');
}
import React from 'react';
import RootApp from './src/navigation/RootApp.tsx';
import FastImage from 'react-native-fast-image';
import {Pressable, SectionList} from 'react-native';
import Animated from 'react-native-reanimated';

export const ReImage = Animated.createAnimatedComponent(FastImage);
export const RePressable = Animated.createAnimatedComponent(Pressable);
export const ReFlashList = Animated.createAnimatedComponent(FlashList);
export const ReSectionList = Animated.createAnimatedComponent(SectionList<any, any>);
// export const useLocalStore = create
const App = () => {
  return <RootApp />;
};

export default App;
