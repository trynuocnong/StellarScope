import React from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import RootStack from './RootStack.tsx';
import {Host} from 'react-native-portalize';
import Toast from 'react-native-toast-message';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {create} from 'zustand/react';
import {createJSONStorage, devtools, persist} from 'zustand/middleware';
import {ZustandLocalStore, ZustandStore} from './index.tsx';
import {MMKV} from 'react-native-mmkv';
import {toastConfig} from './components/ToastConfig.tsx';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {API_KEY} from '@env';
import {THEME_COLORS} from '../utils/resources/colors.ts';

const mmkvStorage = new MMKV();
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1800000,
    },
  },
});

export const baseAPIParams = {
  api_key: API_KEY,
};

// export const useZustandStore = create<ZustandStore>()(
//   devtools(set => ({
//     loading: false,
//     globalError: undefined,
//     onLoad: (stateBoolean: boolean) => set(() => ({loading: stateBoolean})),
//     updateError: (error: Error | undefined) =>
//       set(() => ({globalError: error})),
//   })),
// );

// export const useZustandLocalStore = create<ZustandLocalStore>()(
//   devtools(
//     persist(
//       set => ({
//         useName: '',
//         avatar: '',
//         firstTime: false,
//         imagePermission: false,
//         onUpdatePermission: (state: boolean) => set(() => ({imagePermission: state})),
//         updateFirstTime: (value: boolean) => set(() => ({firstTime: value})),
//         updateUserName: (value: string) => set(() => ({useName: value})),
//         updateUserAvatar: (value: string) => set(() => ({avatar: value})),
//       }),
//       {
//         name: 'local-info',
//         storage: createJSONStorage(() => ({
//           getItem: key => mmkvStorage.getString(key) ?? null,
//           setItem: (key, value) => mmkvStorage.set(key, value),
//           removeItem: key => mmkvStorage.delete(key),
//         })),
//       },
//     ),
//   ),
// );
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
