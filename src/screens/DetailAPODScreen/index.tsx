import React, {useEffect, useRef, useState} from 'react';
import {
  AppState,
  InteractionManager,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {COLORS} from '../../utils/resources/colors.ts';
import {RePressable} from '../../../App.tsx';
import {navRef, PARAMS} from '../../navigation';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import DynamicImage from '../../components/DynamicImage.tsx';
import Animated, {
  FadeIn,
  FadeOut, LinearTransition,
  SlideInDown,
  SlideInUp,
  SlideOutDown,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {CrossSVG} from '../../assets/svg';
import {
  DownloadsState,
  hasAndroidPermission,
  savePicture,
} from '../../utils/FuncUtils.ts';
import {useZustandLocalStore} from '../../navigation/RootApp.tsx';
import {Portal} from 'react-native-portalize';
import Toast from 'react-native-toast-message';

const DetailAPODScreen = () => {
  const canPress = useRef(true);
  const [disable, setDisable] = useState(false);
  const [display, setDisplay] = useState(false);
  const permission = useZustandLocalStore(state => state.imagePermission);
  const updatePermission = useZustandLocalStore(
    state => state.onUpdatePermission,
  );
  const navigation = useNavigation();
  const goBack = () => {
    navRef.current?.goBack();
  };

  const toSetting = () => {
    goBack();
    InteractionManager.runAfterInteractions(async () => {
      await Linking.openSettings();
    });
  };

  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      async nextAppState => {
        if (nextAppState === 'active') {
          const latestPermission = await hasAndroidPermission();
          if (latestPermission !== permission) {
            updatePermission(latestPermission);
          }
        }
      },
    );

    return () => {
      subscription.remove();
    };
  }, [permission, updatePermission]);

  useEffect(() => {
    return navigation.addListener('beforeRemove', event => {
      if (display) {
        setDisplay(false);
        event.preventDefault();
      }
    });
  }, [display, navigation]);

  const {data} = useRoute<RouteProp<PARAMS, 'DetailedAPODScreen'>>().params;
  const downloadImage = () => {
    if (!permission) {
      setDisplay(true);
      return;
    }
    if (canPress.current) {
      canPress.current = false;
      setDisable(true);
      try {
        savePicture(data.url).then((value: DownloadsState) => {
          canPress.current = true;
          setDisable(false);
          if (permission !== value.havePermission) {
            updatePermission(value.havePermission);
          }

          if (!value.havePermission) {
            setDisplay(true);
            return;
          }

          Toast.show({
            type: 'success',
            text1: 'Download image successfully 🥳',
            position: 'top',
          });
        });
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Download image fail 😭',
          position: 'top',
        });
      }
    }
  };

  const disableAnimation = useAnimatedStyle(() => ({
    color: disable
      ? withTiming(COLORS.neutral['50'])
      : withTiming(COLORS.neutral['100']),
    backgroundColor: disable
      ? withTiming(COLORS.primary['50'])
      : withTiming(COLORS.primary['400']),
  }));

  return (
    <Animated.View layout={LinearTransition.springify().damping(15)} style={styles.container}>
      <RePressable onPress={goBack} style={styles.backgroundLayer} />

      <RePressable
        entering={SlideInUp.delay(100).springify().damping(15)}
        onPress={goBack}
        style={styles.backButton}>
        <CrossSVG height={16} width={16} fill={COLORS.neutral['100']} />
      </RePressable>
      <DynamicImage uri={data.url} />

      <Animated.View layout={LinearTransition.springify().damping(15)} style={styles.titleContain}>
        <Text style={styles.title}>{data.title}</Text>
      </Animated.View>

      <Animated.View layout={LinearTransition.springify().damping(15)} style={styles.tagRow}>
        <View style={styles.tagContain}>
          <Text style={styles.tagText}>{data.date}</Text>
        </View>

        <View style={styles.tagContain}>
          <Text style={styles.tagText}>{data.media_type}</Text>
        </View>

        <View style={styles.tagContain}>
          <Text style={styles.tagText}>{data.service_version}</Text>
        </View>
      </Animated.View>

      <Animated.ScrollView layout={LinearTransition.springify().damping(15)} style={styles.scrollContent}>
        <Text style={styles.textExplain}>{data.explanation}</Text>
      </Animated.ScrollView>

      <RePressable
        onPress={downloadImage}
        disabled={disable}
        style={[styles.downloadButton, disableAnimation]}>
        <Animated.Text style={[styles.downloadButtonText, disableAnimation]}>
          Download Image
        </Animated.Text>
      </RePressable>

      {!permission && display ? (
        <Portal>
          <Animated.View
            entering={FadeIn}
            exiting={FadeOut}
            style={[styles.container, styles.portalLayout]}>
            <Pressable onPress={goBack} style={styles.backgroundLayer} />
            <Animated.View
              style={styles.modalContainer}
              entering={SlideInDown.delay(200)}
              exiting={SlideOutDown}>
              <View style={styles.modalRow}>
                <View style={styles.dialogPlaceholderRow}>
                  <View style={styles.appLogo} />
                  <View style={styles.dialogItemRow}>
                    <Text style={styles.appName}>StellarScope</Text>
                    <View style={styles.emptySub} />
                  </View>
                </View>
                <View style={styles.switchContain}>
                  <View style={styles.thumb} />
                </View>
              </View>

              <Text style={styles.dialogTitle}>
                Please update permission to continue this action
              </Text>
              <Text onPress={toSetting} style={styles.dialogText}>
                Go to setting
              </Text>
            </Animated.View>
          </Animated.View>
        </Portal>
      ) : (
        <></>
      )}
    </Animated.View>
  );
};

export default DetailAPODScreen;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'transparent'},
  backgroundLayer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.neutral['0'],
    opacity: 0.75,
  },
  portalLayout: {
    justifyContent: 'center',
  },
  switchContain: {
    width: 50,
    height: 30,
    borderRadius: 30,
    backgroundColor: COLORS.neutral['500'],
  },
  thumb: {
    position: 'absolute',
    top: 5,
    bottom: 5,
    right: 5,
    width: 20,
    borderRadius: 15,
    backgroundColor: COLORS.neutral['100'],
  },
  backButton: {
    backgroundColor: COLORS.neutral['50'],
    padding: 8,
    position: 'absolute',
    top: 35,
    right: 18,
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
  },
  titleContain: {
    marginTop: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginStart: 8,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  title: {
    color: COLORS.accent['100'],
    fontSize: 20,
    fontWeight: '700',
  },
  tagRow: {
    flexDirection: 'row',
    paddingVertical: 4,
    marginStart: 8,
    marginTop: 4,
  },
  tagContain: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginStart: 8,
    borderRadius: 4,
    alignSelf: 'flex-start',
    backgroundColor: COLORS.primary['500'],
    gap: 4,
  },
  tagText: {
    color: COLORS.neutral['100'],
    fontSize: 14,
    fontWeight: '700',
  },
  scrollContent: {
    flexGrow: 1,
  },
  textExplain: {
    marginTop: 12,
    textAlign: 'justify',
    fontSize: 16,
    backgroundColor: COLORS.neutral['10'],
    marginHorizontal: 12,
    color: COLORS.neutral['300'],
  },
  downloadButton: {
    marginBottom: 18,
    marginTop: 12,
    elevation: 10,
    shadowColor: COLORS.neutral['50'],
    shadowOpacity: 0.8,
    marginHorizontal: 12,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 4,
  },
  downloadButtonText: {
    fontSize: 16,
    fontWeight: '700',
  },
  modalContainer: {
    marginHorizontal: 32,
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: COLORS.neutral['200'],
    gap: 5,
    borderRadius: 5,
  },
  emptySub: {
    height: 15,
    flexGrow: 1,
    backgroundColor: COLORS.neutral['400'],
  },
  dialogItemRow: {flex: 1, gap: 4, marginEnd: 24},
  modalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    flexGrow: 1,
  },
  dialogPlaceholderRow: {flexDirection: 'row', gap: 18, flex: 1},
  appLogo: {
    width: 45,
    height: 45,
    backgroundColor: COLORS.neutral['500'],
    borderRadius: 30,
  },
  appName: {
    fontSize: 16,
    alignSelf: 'flex-start',
    color: COLORS.primary['200'],
    paddingVertical: 2,
    borderRadius: 3,
  },
  dialogTitle: {
    fontWeight: '700',
    fontSize: 18,
    color: COLORS.neutral['1000'],
  },
  dialogText: {
    fontWeight: '700',
    textAlign: 'right',
    marginTop: 15,
    fontSize: 18,
    color: COLORS.primary['500'],
  },
});
