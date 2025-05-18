import React, {useCallback, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS} from '../../utils/resources/colors.ts';
import {
  AlertCircleSVG,
  CompassSVG,
  MoonSVG,
  SearchSVG,
  SpeedometerSVG,
  SunnySVG,
  ThunderStormSVG,
} from '../../assets/svg';
import {useQuery} from '@tanstack/react-query';
import AxiosInstance from '../../helper/AxiosInstance.ts';
import {MarWeatherReq, MarWeatherRes, MarWeatherSpec} from '../../utils/DTO';
import {API_ENDPOINT, convertAPI} from '../../utils/APIUtils.ts';
import {API_KEY} from '@env';
import {RouteProp, useRoute} from '@react-navigation/native';
import {PARAMS} from '../../navigation';
import moment from 'moment';
import {baseUV, conditionConfig} from './mock.tsx';

const estimateUVIndex = (season: string, isDustStorm: boolean): number => {
  return isDustStorm ? baseUV[season] - 2 : baseUV[season];
};

export default () => {
  const {sol} =
    useRoute<RouteProp<PARAMS, 'DetailedMarWeatherScreen'>>().params;
  const [keySol, setKeySol] = useState<string[]>([]);
  const [selectedSol, setSelectedSol] = useState<string>(sol);

  const fetchMarWeather = useCallback(async (): Promise<MarWeatherRes> => {
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
    setKeySol(data.sol_keys);
    return data;
  }, []);

  const {
    data: weather,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['weather'],
    queryFn: fetchMarWeather,
  });

  const condition = useMemo(() => {
    if (!weather) {
      return 'sunny';
    }

    const {HWS, Season} = weather[selectedSol] as unknown as MarWeatherSpec;

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
  }, [weather, selectedSol]);

  const renderSolItem = useCallback(
    ({item}: {item: string}) => (
      <TouchableOpacity
        style={[styles.solItem, selectedSol === item && styles.selectedSolItem]}
        onPress={() => setSelectedSol(item)}>
        <Text
          style={[
            styles.solNumber,
            selectedSol === item && styles.selectedSolText,
          ]}>
          Sol {item}
        </Text>
        <Text
          style={[
            styles.solDate,
            selectedSol === item && styles.selectedSolText,
          ]}>
          {weather
            ? `${moment(
                (weather[item] as unknown as MarWeatherSpec).Last_UTC,
              ).format('DD/MM/YYYY')}`
            : ''}
        </Text>
      </TouchableOpacity>
    ),
    [selectedSol, weather],
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mars Weather</Text>
        <TouchableOpacity style={styles.searchButton}>
          <SearchSVG width={24} height={24} fill={COLORS.neutral['100']} />
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary['400']} />
          <Text style={styles.loadingText}>Loading Mars weather data...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <AlertCircleSVG width={40} height={40} fill={COLORS.error['400']} />
          <Text style={styles.errorText}>{error.message}</Text>
          <TouchableOpacity style={styles.retryButton}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : weather ? (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          <View style={styles.solSelector}>
            <Text style={styles.sectionTitle}>Select Sol</Text>
            <FlatList
              horizontal
              data={keySol}
              renderItem={renderSolItem}
              keyExtractor={item => item}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.solList}
            />
          </View>

          <View style={styles.weatherCard}>
            <View style={styles.weatherHeader}>
              <View>
                <Text style={styles.weatherSol}>Sol {selectedSol}</Text>
                <Text style={styles.weatherDate}>
                  {moment(
                    (weather[selectedSol] as unknown as MarWeatherSpec)
                      .Last_UTC,
                  ).format('DD/MM/YYYY')}
                </Text>
                <Text style={styles.weatherSeason}>
                  {(weather[selectedSol] as unknown as MarWeatherSpec).Season}{' '}
                  Season
                </Text>
              </View>
              <View style={styles.weatherIconContainer}>
                {conditionConfig[condition].icon}
                <Text style={styles.weatherCondition}>
                  {conditionConfig[condition].description}
                </Text>
              </View>
            </View>

            <View style={styles.temperatureContainer}>
              <Text style={styles.temperatureTitle}>Temperature</Text>
              <View style={styles.temperatureValues}>
                <View style={styles.temperatureItem}>
                  <Text style={styles.temperatureLabel}>Low</Text>
                  <Text style={styles.temperatureMin}>
                    {(weather[selectedSol] as unknown as MarWeatherSpec).AT.mn}
                    °C
                  </Text>
                </View>
                <View style={styles.temperatureItem}>
                  <Text style={styles.temperatureLabel}>High</Text>
                  <Text style={styles.temperatureMax}>
                    {(weather[selectedSol] as unknown as MarWeatherSpec).AT.mx}
                    °C
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.detailsCard}>
            <Text style={styles.detailsTitle}>Weather Details</Text>

            <View style={styles.detailRow}>
              <View style={styles.detailItem}>
                <SpeedometerSVG
                  height={20}
                  width={20}
                  fill={COLORS.primary['300']}
                />
                <Text style={styles.detailLabel}>Pressure</Text>
                <Text style={styles.detailValue}>
                  {(weather[selectedSol] as unknown as MarWeatherSpec).PRE.av}{' '}
                  Pa
                </Text>
              </View>
              <View style={styles.detailItem}>
                <SunnySVG height={20} width={20} fill={COLORS.primary['300']} />
                <Text style={styles.detailLabel}>UV Index</Text>
                <Text style={styles.detailValue}>
                  {estimateUVIndex(
                    (weather[selectedSol] as unknown as MarWeatherSpec).Season,
                    condition === 'stormy',
                  )}
                </Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <View style={styles.detailItem}>
                <CompassSVG
                  height={20}
                  width={20}
                  fill={COLORS.primary['300']}
                />
                <Text style={styles.detailLabel}>Wind Direction</Text>
                <Text style={styles.detailValue}>
                  {
                    (weather[selectedSol] as unknown as MarWeatherSpec).WD
                      .most_common.compass_degrees
                  }
                </Text>
              </View>
              <View style={styles.detailItem}>
                <ThunderStormSVG
                  height={20}
                  width={20}
                  fill={COLORS.primary['300']}
                />
                <Text style={styles.detailLabel}>Wind Speed</Text>
                <Text style={styles.detailValue}>
                  {(weather[selectedSol] as unknown as MarWeatherSpec).HWS.av}{' '}
                  m/s
                </Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <View style={styles.detailItem}>
                <SunnySVG height={20} width={20} fill={COLORS.primary['300']} />
                <Text style={styles.detailLabel}>Sunrise</Text>
                <Text style={styles.detailValue}>
                  {moment(
                    (weather[selectedSol] as unknown as MarWeatherSpec)
                      .First_UTC,
                  ).format('DD/MM/YY HH:mm:ss')}
                </Text>
              </View>
              <View style={styles.detailItem}>
                <MoonSVG height={20} width={20} fill={COLORS.primary['300']} />
                <Text style={styles.detailLabel}>Sunset</Text>
                <Text style={styles.detailValue}>
                  {moment(
                    (weather[selectedSol] as unknown as MarWeatherSpec)
                      .Last_UTC,
                  ).format('DD/MM/YY HH:mm:ss')}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.windRoseCard}>
            <Text style={styles.windRoseTitle}>Mars Wind Rose Chart</Text>
            <Text style={styles.windRoseSubtitle}>
              Wind direction and intensity visualization from NASA InSight
            </Text>

            <View style={styles.webViewContainer}>
              {/*<WebView*/}
              {/*  source={{uri: WIND_ROSE_CHART_URL}}*/}
              {/*  style={styles.webView}*/}
              {/*  onLoadStart={() => setWebViewLoading(true)}*/}
              {/*  onLoadEnd={() => setWebViewLoading(false)}*/}
              {/*  scrollEnabled={false}*/}
              {/*  javaScriptEnabled={true}*/}
              {/*  domStorageEnabled={true}*/}
              {/*/>*/}
            </View>

            <Text style={styles.windRoseDescription}>
              This wind rose shows the wind speed and direction measured by
              NASA's InSight lander on Mars. The chart displays wind direction
              (compass direction) and intensity (color bands).
            </Text>
          </View>

          <TouchableOpacity style={styles.searchFullButton}>
            <SearchSVG width={20} height={20} fill={COLORS.neutral['100']} />
            <Text style={styles.searchFullButtonText}>
              Search Weather History
            </Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <View />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f1e',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.primary['50'],
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.neutral['100'],
  },
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary['500'],
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: COLORS.neutral['400'],
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    marginTop: 16,
    fontSize: 16,
    color: COLORS.error['400'],
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: COLORS.primary['500'],
    borderRadius: 8,
  },
  retryButtonText: {
    color: COLORS.neutral['100'],
    fontWeight: '600',
    fontSize: 16,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.neutral['100'],
    marginBottom: 12,
  },
  solSelector: {
    marginBottom: 16,
  },
  solList: {
    paddingBottom: 8,
  },
  solItem: {
    backgroundColor: COLORS.primary['10'],
    borderRadius: 12,
    padding: 12,
    marginRight: 8,
    borderWidth: 1,
    borderColor: COLORS.primary['50'],
    alignItems: 'center',
    minWidth: 80,
  },
  selectedSolItem: {
    backgroundColor: COLORS.primary['500'],
    borderColor: COLORS.primary['300'],
  },
  solNumber: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.neutral['100'],
    marginBottom: 4,
  },
  solDate: {
    fontSize: 12,
    color: COLORS.neutral['500'],
  },
  selectedSolText: {
    color: COLORS.neutral['100'],
  },
  weatherCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.primary['50'],
  },
  weatherHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  weatherSol: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.neutral['100'],
    marginBottom: 4,
  },
  weatherDate: {
    fontSize: 16,
    color: COLORS.neutral['400'],
    marginBottom: 4,
  },
  weatherSeason: {
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'capitalize',
    color: COLORS.accent['400'],
  },
  weatherIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  weatherCondition: {
    fontSize: 14,
    color: COLORS.accent['400'],
    marginTop: 4,
  },
  temperatureContainer: {
    backgroundColor: COLORS.primary['50'],
    borderRadius: 12,
    padding: 16,
  },
  temperatureTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.neutral['100'],
    marginBottom: 12,
  },
  temperatureValues: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  temperatureItem: {
    alignItems: 'center',
  },
  temperatureLabel: {
    fontSize: 14,
    color: COLORS.neutral['400'],
    marginBottom: 4,
  },
  temperatureMin: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.primary['300'],
  },
  temperatureMax: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.error['400'],
  },
  detailsCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.primary['50'],
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.neutral['100'],
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  detailItem: {
    flex: 1,
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 14,
    color: COLORS.neutral['400'],
    marginTop: 4,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.neutral['100'],
  },
  windRoseCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.primary['50'],
  },
  windRoseTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.neutral['100'],
    marginBottom: 4,
  },
  windRoseSubtitle: {
    fontSize: 14,
    color: COLORS.neutral['400'],
    marginBottom: 16,
  },
  webViewContainer: {
    height: 400,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: COLORS.neutral['1000'],
    marginBottom: 12,
    position: 'relative',
  },
  webView: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  webViewLoading: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.neutral['1000'],
    zIndex: 1,
  },
  webViewLoadingText: {
    marginTop: 12,
    fontSize: 16,
    color: COLORS.neutral['400'],
  },
  windRoseDescription: {
    fontSize: 14,
    color: COLORS.neutral['300'],
    lineHeight: 20,
  },
  searchFullButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary['500'],
    borderRadius: 12,
    paddingVertical: 14,
    marginTop: 8,
  },
  searchFullButtonText: {
    color: COLORS.neutral['100'],
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 8,
  },
});
