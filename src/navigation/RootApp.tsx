import React, {useCallback} from 'react';
import {Pressable, StatusBar, StyleSheet, Text, View} from 'react-native';
import RootStack from './RootStack.tsx';
import Animated from 'react-native-reanimated';
import {useDispatch, useSelector} from 'react-redux';
import {Host} from 'react-native-portalize';
import {NetInfoState} from '@react-native-community/netinfo';
import {selectConnection} from '../redux/selectors/globalSelector.ts';
import {updateNetWork} from '../redux/actions/GlobalAction.ts';
import Toast from 'react-native-toast-message';
import {ToastConfig} from 'react-native-toast-message/lib/src/types';

const toastConfig: ToastConfig = {
  success: props => (
    <View style={[styles.toastContainer, styles.success]}>
      <Text style={styles.text}>{props.text1}</Text>
    </View>
  ),

  error: props => (
    <View style={[styles.toastContainer, styles.error]}>
      <Text style={styles.text}>{props.text1}</Text>
    </View>
  ),

  detailSuccess: props => (
    <View style={[styles.toastContainer, styles.success]}>
      <Text style={styles.text}>{props.text1}</Text>
      <Text style={styles.subText}>{props.text2}</Text>
    </View>
  ),

  detailError: props => (
    <View style={[styles.toastContainer, styles.error]}>
      <Text style={styles.text}>{props.text1}</Text>
      <Text style={styles.subText}>{props.text2}</Text>
    </View>
  ),

  warning: props => (
    <View style={[styles.toastContainer, styles.warning]}>
      <Text style={styles.text}>{props.text1}</Text>
    </View>
  ),

  detailWarning: props => (
    <View style={[styles.toastContainer, styles.warning]}>
      <Text style={styles.text}>{props.text1}</Text>
      <Text style={styles.subText}>{props.text2}</Text>
    </View>
  ),

  withAction: props => (
    <View style={[styles.toastContainer, styles.action]}>
      <Text style={styles.text}>{props.text1}</Text>
      <Pressable style={styles.actionButton} onPress={props.onPress}>
        <Text style={styles.buttonText}>{props.text2}</Text>
      </Pressable>
    </View>
  ),
};

export default function () {
  const isConnected = useSelector(selectConnection);
  const dispatch = useDispatch();
  const netInfoListener = useCallback(
    (state: NetInfoState) => {
      if (state.isConnected !== isConnected) {
        // display have connection after turn on wifi
        if (!isConnected && state.isConnected && state.isInternetReachable) {
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
        <StatusBar
          translucent={true}
          backgroundColor={'transparent'}
          barStyle={'dark-content'}
        />
        <RootStack />
        {/*<Animated.View>*/}
        {/*  <Animated.Text></Animated.Text>*/}
        {/*</Animated.View>*/}
      </Host>
      <Toast config={toastConfig} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toastContainer: {
    padding: 12,
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  success: {
    backgroundColor: '#4CAF50', // Green
  },
  error: {
    backgroundColor: '#F44336', // Red
  },
  warning: {
    backgroundColor: '#FFC107', // Yellow
  },
  action: {
    backgroundColor: '#2196F3',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  subText: {
    fontSize: 14,
    color: '#fff',
    marginTop: 4,
  },
  actionButton: {
    backgroundColor: '#fff',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#2196F3',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
