import React from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import RootStack from './RootStack.tsx';
import {Host} from 'react-native-portalize';
import Toast from 'react-native-toast-message';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {MMKV} from 'react-native-mmkv';
import {toastConfig} from './components/ToastConfig.tsx';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {NASA_API_KEY} from '@env';
import {THEME_COLORS} from '../utils/resources/colors.ts';

export const mmkvStorage = new MMKV();
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1800000,
      gcTime: 1800000,
    },
  },
});

export const baseAPIParams = {
  api_key: NASA_API_KEY,
};
export default function () {

  return (
    <GestureHandlerRootView style={styles.container}>
      <QueryClientProvider client={queryClient}>
        <Host>
          <StatusBar
            translucent={true}
            backgroundColor={'transparent'}
            barStyle={'light-content'}
          />
          <RootStack />
          {/*<Animated.View>*/}
          {/*  <Animated.Text></Animated.Text>*/}
          {/*</Animated.View>*/}
        </Host>
        <Toast config={toastConfig} />
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME_COLORS.background,
  },
});
