import React, {useCallback} from 'react';
import {StatusBar} from 'react-native';
import RootStack from './RootStack.tsx';
import Animated from 'react-native-reanimated';
import {useDispatch, useSelector} from 'react-redux';
import {Host} from 'react-native-portalize';
import {NetInfoState} from '@react-native-community/netinfo';
import {selectConnection} from '../redux/selectors/globalSelector.ts';
import {updateNetWork} from '../redux/actions/GlobalAction.ts';

export default function () {
  const isConnected = useSelector(selectConnection);
  const dispatch = useDispatch();
  const netInfoListener = useCallback(
    (state: NetInfoState) => {
      if (state.isConnected !== isConnected) {
        // display have connection after turn on wifi
        if (!isConnected && state.isConnected && state.isInternetReachable) {
        }
        // display have no connection after turn off wifi
        if (!state.isConnected) {
        }
        // display have no connection cause wifi can't access internet
        if (state.isConnected && !state.isInternetReachable) {
        }
        dispatch(
          updateNetWork(!!state.isConnected && state.isInternetReachable),
        );
      }
    },
    [dispatch, isConnected],
  );

  return (
    <Animated.View style={styles.container}>
      <Host>
        <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
        <RootStack />
        <Animated.View>
          <Animated.Text></Animated.Text>
        </Animated.View>
      </Host>
    </Animated.View>
  );
}

const styles = {
  container: {
    flex: 1,
  },
};
