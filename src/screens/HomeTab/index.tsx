import * as React from 'react';
import {useCallback, useMemo, useState} from 'react';
import FeatureDisplayItem from '../../components/FeatureDisplayItem.tsx';
import {
  APODRes,
  EarthImageRes,
  MarWeatherReq,
  MarWeatherRes,
  MarWeatherSpec,
} from '../../utils/DTO';
import {
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
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
import {featureList, SECTION_HEADER, TECHTRANSFER_FILTER} from './mock.ts';
import AxiosInstance from '../../helper/AxiosInstance.ts';
import {API_ENDPOINT, convertAPI} from '../../utils/APIUtils.ts';
import {baseAPIParams} from '../../navigation/RootApp.tsx';
import {useQueries, useQuery} from '@tanstack/react-query';
import {RePressable, ReSectionList} from '../../../App.tsx';
import {SafeAreaView} from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';
import {KeyValue, navRef, ROUTES} from '../../navigation';
import EarthCarousel from './components/EarthCarousel.tsx';
import SegmentButtonRow from '../../components/SegmentButtonRow.tsx';
import {API_KEY} from '@env';
import {ModifyMarWeatherType} from './type.ts';
import moment from 'moment';
import {CloudSVG, SunnySVG, ThunderStormSVG} from '../../assets/svg';

const WIDTH = Dimensions.get('screen').width;
const EARTH_IMAGE_HEIGHT = WIDTH * 0.6;
const EARTH_IMAGE_WIDTH = WIDTH - 24 - 32;
const ACTION_BOARD_HEIGHT = 127;

const WeatherConditionDisplay = ({
  weatherData,
}: {
  weatherData?: MarWeatherSpec;
}) => {
  if (!weatherData) {
    return <View />;
  }
  const condition = (() => {
    const {HWS, Season} = weatherData;
    if (HWS.av > 15) {
      return 'stormy';
    }
    if (HWS.av > 8) {
      return 'dusty';
    }
    if (Season === 'summer' && HWS.av > 5) {
      return 'dusty';
    }
    return 'sunny';
  })();

  const conditionConfig = {
    sunny: {
      icon: <SunnySVG width={64} height={64} fill="#FFA500" />,
      label: 'Sunny',
      color: '#FFD700',
      description: 'Clear skies',
    },
    dusty: {
      icon: <CloudSVG width={64} height={64} fill="#A0522D" />,
      label: 'Dusty',
      color: '#D2B48C',
      description: 'Light dust',
    },
    stormy: {
      icon: <ThunderStormSVG width={64} height={64} fill="#800000" />,
      label: 'Dust Storm',
      color: '#8B0000',
      description: 'Severe dust storm',
    },
  };

  const currentConfig = conditionConfig[condition];

  return (
    <View style={styles.weatherIcon}>
      {currentConfig.icon}
      <View>
        <Text style={[styles.weatherCondition, {color: currentConfig.color}]}>
          {currentConfig.label}
        </Text>
      </View>
    </View>
  );
};

const fetchAPOD = async (): Promise<APODRes> => {
  const {data} = await AxiosInstance.get(convertAPI(API_ENDPOINT.APOD), {
    params: baseAPIParams,
  });
  return data;
};

const fetchTech = async (): Promise<string[][]> => {
  const {data} = await AxiosInstance.get(
    convertAPI(API_ENDPOINT.TECH_TRANSFER.PATENT),
    {
      params: {...baseAPIParams, space: ''},
    },
  );
  return data.results.slice(0, 8);
};

const fetchEarthImage = async (): Promise<EarthImageRes[]> => {
  const {data} = await AxiosInstance.get(convertAPI(API_ENDPOINT.EARTH_IMAGE), {
    params: baseAPIParams,
  });
  return data;
};

const fetchMarsWeather = async (): Promise<ModifyMarWeatherType> => {
  const params: MarWeatherReq = {
    api_key: API_KEY,
    ver: '1.0',
    feedtype: 'json',
  };
  const {data} = await AxiosInstance.get<MarWeatherRes>(
    convertAPI(API_ENDPOINT.MARS_WEATHER),
    {
      params: params,
    },
  );
  let keyArr = data.sol_keys;
  while (keyArr.length > 0) {
    let len = keyArr.length - 1;
    if (
      data.validity_checks[keyArr[len]].AT.valid &&
      data.validity_checks[keyArr[len]].HWS.valid &&
      data.validity_checks[keyArr[len]].PRE.valid &&
      data.validity_checks[keyArr[len]].WD.valid
    ) {
      return {
        title: keyArr[len],
        ...data[keyArr[len]],
      } as unknown as ModifyMarWeatherType;
    }
    keyArr.pop();
  }
  let len = data.sol_keys.length - 1;

  return {
    title: data.sol_keys[len],
    ...data[data.sol_keys[len]],
  } as unknown as ModifyMarWeatherType;
};

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
    queryKey: ['apod'],
    queryFn: fetchAPOD,
  });

  const result = useQueries({
    queries: [
      {queryKey: ['earthImage', 1], queryFn: fetchEarthImage},
      {queryKey: ['mar_weather', 2], queryFn: fetchMarsWeather},
      {queryKey: ['tech', 3], queryFn: fetchTech},
    ],
  });

  const listData = useMemo(() => {
    const isComplete = result.every(it => it.isSuccess);
    if (!isComplete) {
      return [];
    }
    return result.map((item, index) => {
      let title;
      switch (index) {
        case 0:
          title = SECTION_HEADER.EARTH;
          break;
        case 1:
          title = SECTION_HEADER.MAR_WEATHER;
          break;
        case 2:
          title = SECTION_HEADER.TECH;
          break;
        default:
          title = 'Unknown';
      }

      return {title, data: [item.data]};
    });
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

  const renderTechItem = ({item}: {item: any}) => {
    const goToTechDetail = () => {
      navRef.current?.navigate(ROUTES.DETAIL_TECH_SCREEN, {data: item});
    };
    return (
      <Pressable
        onPress={goToTechDetail}
        style={styles.techItemContainer}>
        <View style={styles.techItemContent}>
          <Text style={styles.techItemTitle} numberOfLines={2}>
            {item[2]}
          </Text>
          <Text style={styles.techItemDescription} numberOfLines={3}>
            {item[3]}
          </Text>
          <View style={styles.techItemFooter}>
            <Text style={styles.learnMoreText}>Learn more</Text>
          </View>
        </View>
        <FastImage
          source={{uri: item[10]}}
          style={styles.techItemImage}
          resizeMode="cover"
        />
      </Pressable>
    );
  };

  const renderItem = useCallback(({item, section}: any) => {
    const {title} = section;
    if (title === SECTION_HEADER.EARTH) {
      return <EarthCarousel data={item} />;
    }

    if (title === SECTION_HEADER.MAR_WEATHER) {
      const nav = () => {
        navRef.current?.navigate(ROUTES.DETAIL_MAR_WEATHER_SCREEN, {
          sol: (item as unknown as ModifyMarWeatherType).title,
        });
      };
      return (
        <TouchableOpacity onPress={nav} style={[styles.baseSectionContain]}>
          <View style={[styles.flex1, styles.weatherContent]}>
            <View style={styles.marginBottom12}>
              <Text style={styles.solNumber}>
                Sol {(item as unknown as ModifyMarWeatherType).title}
              </Text>
              <Text style={styles.earthDate}>
                {moment(
                  (item as unknown as ModifyMarWeatherType).Last_UTC,
                ).format('DD/MM/YYYY')}
              </Text>
              <Text style={styles.season}>
                {(item as unknown as ModifyMarWeatherType).Season}
              </Text>
            </View>

            <View style={styles.temperatureInfo}>
              <Text style={styles.tempLabel}>Temperature</Text>
              <View style={styles.tempRange}>
                <Text style={styles.minTemp}>
                  {(item as unknown as ModifyMarWeatherType).AT.mn}°C
                </Text>
                <Text style={styles.tempDivider}>to</Text>
                <Text style={styles.maxTemp}>
                  {(item as unknown as ModifyMarWeatherType).AT.mx}°C
                </Text>
              </View>
            </View>

            <WeatherConditionDisplay weatherData={item} />
          </View>
        </TouchableOpacity>
      );
    }

    if (title === SECTION_HEADER.TECH) {
      return (
        <View style={styles.baseSectionContain}>
          <SegmentButtonRow
            incompatibleSpace={56}
            style={styles.segmentStyle}
            options={TECHTRANSFER_FILTER}
            layerColor={'#4e5ff8'}
            textColor={COLORS.neutral['100']}
          />
          <FlatList
            scrollEnabled={false}
            data={item}
            renderItem={renderTechItem}
            style={styles.lisTechContainer}
            showsVerticalScrollIndicator={false}
          />
        </View>
      );
    }

    return <></>;
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
