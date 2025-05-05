import React from 'react';
import { StyleSheet } from 'react-native';
import WebView from 'react-native-webview';
import {RouteProp, useRoute} from '@react-navigation/native';
import {PARAMS} from '../../navigation';
export default () => {
  const {url} = useRoute<RouteProp<PARAMS, 'WebviewScreen'>>().params;
 return <WebView source={{uri: url}} />;
};

const styles = StyleSheet.create({});
