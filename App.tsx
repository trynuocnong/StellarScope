import Animated from 'react-native-reanimated';

if (__DEV__) {
    require('./ReactotronConfig');
}
import store from './src/redux/store.ts';
import React from 'react';
import RootApp from './src/navigation/RootApp.tsx';
import {Provider} from 'react-redux';
import FastImage from 'react-native-fast-image';
import {Pressable} from 'react-native';

export const ReImage = Animated.createAnimatedComponent(FastImage);
export const RePressable = Animated.createAnimatedComponent(Pressable);
const App = () => {
  return (
    <Provider store={store}>
      <RootApp />
    </Provider>
  );
};

export default App;
