import React from 'react';
import {StatusBar} from 'react-native';
import RootStack from './RootStack.tsx';
import Animated from 'react-native-reanimated';

export default function () {
  return (
    <Animated.View style={styles.container}>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      <RootStack />
        <Animated.View>
            <Animated.Text></Animated.Text>
        </Animated.View>
    </Animated.View>
  );
}

const styles = {
  container: {
    flex: 1,
  },
};
