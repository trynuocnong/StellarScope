import * as React from 'react';
import {useCallback, useMemo, useState} from 'react';
import FeatureDisplayItem from '../../components/FeatureDisplayItem.tsx';
import {APODRes, EarthImageRes} from '../../utils/DTO';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import Animated, {
  LinearTransition,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import DynamicImage from '../../components/DynamicImage.tsx';
import {COLORS, THEME_COLORS} from '../../utils/resources/colors.ts';
import {featureList, SECTION_HEADER, TECHTRANSFER_FILTER} from './mock.tsx';
import {
  DefaultError,
  useQueries,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query';
import {RePressable, ReSectionList} from '../../../App.tsx';
import {SafeAreaView} from 'react-native-safe-area-context';
import {KeyValue, navRef, ROUTES} from '../../navigation';
import EarthCarousel from './components/EarthCarousel.tsx';
import {ModifyMarWeatherType} from './type.ts';
import MarsWeather from './components/MarsWeather.tsx';
import TechTransfer from './components/TechTransfer.tsx';
import {
  fetchAPOD,
  fetchEarthImage,
  fetchMarsWeather,
  fetchTech,
} from './utils.tsx';

const WIDTH = Dimensions.get('screen').width;
const EARTH_IMAGE_HEIGHT = WIDTH * 0.6;
const EARTH_IMAGE_WIDTH = WIDTH - 24 - 32;
const ACTION_BOARD_HEIGHT = 127;

const renderTitle = ({section: {title}}: any) => (
  <Text style={styles.sectionTitle}>{title}</Text>
);

export default () => {
  const padTop = useSharedValue(45);
  const scrollY = useSharedValue(0);
  const [techFilter, setTechFilter] = useState<KeyValue>(
    TECHTRANSFER_FILTER[0],
  );
  const onScroll = useAnimatedScrollHandler(event => {
    scrollY.value = Math.abs(event.contentOffset.y);
  });

  const {data: apod} = useQuery<APODRes>({
    queryKey: [SECTION_HEADER.APOD],
    queryFn: fetchAPOD,
  });

  const result = useQueries({
    queries: [
      {queryKey: [SECTION_HEADER.EARTH, 1], queryFn: fetchEarthImage},
      {queryKey: [SECTION_HEADER.MAR_WEATHER, 2], queryFn: fetchMarsWeather},
      {
        queryKey: [SECTION_HEADER.TECH, techFilter],
        queryFn: () => fetchTech(techFilter),
      },
    ],
  });

  const listData = useMemo(() => {
    const [earthImage, mar_weather, tech]: [
      UseQueryResult<EarthImageRes[], unknown>,
      UseQueryResult<ModifyMarWeatherType, unknown>,
      UseQueryResult<string[][], unknown>,
    ] = result;
    return [
      {title: SECTION_HEADER.EARTH, data: [earthImage]},
      {
        title: SECTION_HEADER.MAR_WEATHER,
        data: [mar_weather],
      },
      {title: SECTION_HEADER.TECH, data: [tech]},
    ];
  }, [result]);

  const imageAnimatedStyle = useAnimatedStyle(() => {
    let scale = 1;
    let opacity = 1;
    if (scrollY.value > 25) {
      scale = 1 + (scrollY.value - 25) / (padTop.value + 5);
      opacity = 1 - scrollY.value / (padTop.value + 5);
    }

    return {
      transform: [{scale}],
      opacity,
    };
  });

  const actionButtonContainer = useAnimatedStyle(() => {
    return {
      height: withDelay(
        200,
        withTiming(
          padTop.value !== 45
            ? ACTION_BOARD_HEIGHT - 16
            : ACTION_BOARD_HEIGHT + 45,
        ),
      ),
    };
  });

  const renderHeader = useCallback(() => {
    const updatePadTop = (num: number) => {
      if (num < 590) {
        padTop.value = withTiming(num - 120);
      } else {
        padTop.value = withTiming(590 - 120);
      }
    };
    const goToAPODDetails = () => {
      navRef.current?.navigate(ROUTES.DETAIL_APOD_SCREEN, {data: apod!});
    };
    return (
      <Animated.View
        layout={LinearTransition.springify().damping(10)}
        style={styles.headerContainer}>
        <RePressable
          onPress={goToAPODDetails}
          style={[styles.imageHeaderContainer, imageAnimatedStyle]}>
          <DynamicImage uri={apod?.url || ''} onHeightChange={updatePadTop} />
        </RePressable>
        <Animated.View
          layout={LinearTransition.springify().damping(10)}
          style={actionButtonContainer}>
          <View style={[styles.actionContainer]}>
            <View style={styles.logoActionHighlight}>
              <Text style={styles.logoTextHighlight}>🚀</Text>
            </View>

            <View style={styles.actionHolderContain}>
              {featureList.map(item => (
                <FeatureDisplayItem
                  key={item.name}
                  name={item.name}
                  icon={item.icon}
                  onPress={item.onPress}
                />
              ))}
            </View>
          </View>
        </Animated.View>
        <View style={styles.headerLayer} />
      </Animated.View>
    );
  }, [actionButtonContainer, apod, imageAnimatedStyle, padTop]);
  const renderItem = useCallback(({item, section}: any) => {
    const {title} = section;
    switch (title) {
      case SECTION_HEADER.EARTH: {
        const earthItem = item as UseQueryResult<EarthImageRes[], DefaultError>;
        const refreshEarthImage = () => earthItem.refetch();
        return <EarthCarousel data={earthItem} refresh={refreshEarthImage} />;
      }
      case SECTION_HEADER.MAR_WEATHER: {
        const weatherMars = item as UseQueryResult<
          ModifyMarWeatherType,
          DefaultError
        >;
        return <MarsWeather data={weatherMars} />;
      }
      case SECTION_HEADER.TECH: {
        const techItem = item as UseQueryResult<string[][], DefaultError>;
        const select = (keyValue: KeyValue) => {
          setTechFilter(keyValue);
        };
        return (
          <TechTransfer
            options={TECHTRANSFER_FILTER}
            data={techItem}
            onSelect={select}
          />
        );
      }
      default:
        return <></>;
    }
  }, []);

  return (
    <Animated.View
      layout={LinearTransition.springify().damping(10)}
      style={styles.container}>
      <SafeAreaView style={styles.container} edges={['top']}>
        <ReSectionList
          onScroll={onScroll}
          scrollEventThrottle={16}
          ListHeaderComponent={renderHeader}
          layout={LinearTransition.springify().damping(15)}
          style={[styles.mainContent]}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.sectionListContent}
          sections={listData}
          renderItem={renderItem}
          renderSectionHeader={renderTitle}
        />
      </SafeAreaView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  marginBottom12: {
    marginBottom: 12,
  },
  container: {
    flex: 1,
    backgroundColor: THEME_COLORS.background,
  },
  mainContent: {
    gap: 16,
  },
  sectionListContent: {
    paddingBottom: 32,
  },
  headerContainer: {
    flexDirection: 'column',
    overflow: 'visible',
  },
  actionContainer: {
    left: 0,
    right: 0,
    bottom: 16,
    marginHorizontal: 16,
    backgroundColor: THEME_COLORS.card,
    borderRadius: 16,
    paddingBottom: 20,
    elevation: 15,
    shadowOpacity: 0.5,
    shadowRadius: 16,
    position: 'absolute',
  },
  logoActionHighlight: {
    alignSelf: 'center',
    position: 'absolute',
    top: -20,
    backgroundColor: THEME_COLORS.card,
    padding: 15,
    borderRadius: 45,
  },
  logoTextHighlight: {fontSize: 25, textAlign: 'center'},
  imageHeaderContainer: {
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    maxHeight: 590,
    overflow: 'hidden',
  },
  actionHolderContain: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 45,
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: 15,
  },
  flatListContentStyle: {
    gap: 12,
    paddingStart: 12,
    paddingEnd: 16,
  },
  headerLayer: {
    ...StyleSheet.absoluteFillObject,
    top: 140,
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: -1,
    backgroundColor: THEME_COLORS.background,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 700,
    lineHeight: 24,
    marginTop: 16,
    color: COLORS.neutral['100'],
    paddingBottom: 8,
    textAlign: 'left',
    justifyContent: 'space-between',
    marginHorizontal: 12,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: '#1a1a2e',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    padding: 16,
  },
  baseSectionContain: {
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
    backgroundColor: '#1a1a2e',
    paddingTop: 12,
    overflow: 'hidden',
    marginHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    padding: 16,
  },
  segmentStyle: {
    marginBottom: 10,
    backgroundColor: COLORS.neutral['900'],
    borderRadius: 8,
    height: 55,
  },
  sectionEarthImageContainer: {
    height: EARTH_IMAGE_HEIGHT,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  sectionEarthImage: {
    width: EARTH_IMAGE_WIDTH,
    height: EARTH_IMAGE_HEIGHT,
    backgroundColor: THEME_COLORS.black,
  },
  sectionItem: {
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    overflow: 'hidden',
  },
  sectionItemImage: {width: '100%', height: 330},
  sectionDateItem: {
    padding: 6,
    color: '#fff',
    fontSize: 12,
    lineHeight: 16,
    fontWeight: 700,
    borderTopLeftRadius: 6,
    borderBottomRightRadius: 6,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  sectionItemTextContainer: {gap: 4, padding: 12},
  sectionItemTitle: {
    fontSize: 16,
    lineHeight: 24,
    color: '#000',
    fontWeight: 700,
    marginBottom: 4,
  },
  sectionItemSubTitle: {
    fontSize: 12,
    lineHeight: 16,
    color: '#000',
    fontWeight: 600,
  },
  lisTechContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  techFilterButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    marginHorizontal: 4,
    borderRadius: 8,
  },
  selectedTechFilterButton: {
    backgroundColor: '#4e5ff8',
  },
  techFilterButtonText: {
    color: '#a0a0b9',
    fontWeight: '600',
    marginLeft: 6,
    fontSize: 13,
  },
  selectedTechFilterButtonText: {
    color: 'white',
  },
  techItemContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
  },
  techItemContent: {
    flex: 1,
    padding: 12,
  },
  techItemTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
    marginBottom: 4,
  },
  techItemDate: {
    fontSize: 12,
    color: '#a0a0b9',
    marginBottom: 8,
  },
  techItemDescription: {
    fontSize: 14,
    color: '#d1d1e0',
    lineHeight: 20,
  },
  techItemFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  learnMoreText: {
    color: '#4e5ff8',
    fontWeight: '600',
    fontSize: 13,
    marginRight: 4,
  },
  techItemImage: {
    width: 100,
    height: '100%',
  },
  solNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 2,
  },
  earthDate: {
    fontSize: 14,
    color: '#a0a0b9',
    marginBottom: 2,
  },
  season: {
    fontSize: 14,
    color: COLORS.accent['400'],
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  temperatureInfo: {
    marginTop: 4,
  },
  tempLabel: {
    fontSize: 12,
    color: '#a0a0b9',
    marginBottom: 4,
  },
  tempRange: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  minTemp: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.primary['200'],
  },
  tempDivider: {
    fontSize: 12,
    color: '#a0a0b9',
    marginHorizontal: 6,
  },
  maxTemp: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.error['400'],
  },
  weatherIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  weatherCondition: {
    fontSize: 12,
    color: COLORS.accent['400'],
    marginTop: 4,
    textAlign: 'center',
    fontWeight: '500',
  },
  weatherContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
