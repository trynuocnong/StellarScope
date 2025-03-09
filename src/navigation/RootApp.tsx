import React from 'react';
import {StatusBar} from 'react-native';
import RootStack from './RootStack.tsx';
import Animated from 'react-native-reanimated';
import {Provider} from 'react-redux';
import store from '../redux/store.ts';
import {Host} from 'react-native-portalize';

export default function () {
  return (
    <Provider store={store}>
      <Animated.View style={styles.container}>
        <Host>
          <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
          <RootStack />
          <Animated.View>
            <Animated.Text></Animated.Text>
          </Animated.View>
        </Host>
      </Animated.View>
    </Provider>
  );
}

const styles = {
  container: {
    flex: 1,
  },
};
