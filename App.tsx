if (__DEV__) {
  require('./ReactotronConfig');
}
import React from 'react';
import RootApp from './src/navigation/RootApp.tsx';
import FastImage from 'react-native-fast-image';
import {Pressable} from 'react-native';
import Animated from 'react-native-reanimated';

export const ReImage = Animated.createAnimatedComponent(FastImage);
export const RePressable = Animated.createAnimatedComponent(Pressable);
// export const useLocalStore = create
const App = () => {
  return <RootApp />;
};

export default App;
