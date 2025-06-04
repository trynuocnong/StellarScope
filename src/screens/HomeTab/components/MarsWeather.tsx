import React from 'react';
import {
  LayoutChangeEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {MarWeatherProps} from '../type.ts';
import moment from 'moment/moment';
import {COLORS, THEME_COLORS} from '../../../utils/resources/colors.ts';
import {MarWeatherSpec} from '../../../utils/DTO';
import {conditionConfig} from '../mock.tsx';
import {navRef, ROUTES} from '../../../navigation';
import Skeleton from '../../../components/Skeleton.tsx';

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
const MarsWeather = ({data, style, refresh}: MarWeatherProps) => {
  const nav = () => {
    navRef.current?.navigate(ROUTES.DETAIL_MAR_WEATHER_SCREEN, {
      sol: data.data?.title || '',
    });
  };

  if (data.isPending) {
    return (
      <View style={[styles.baseSectionContain, style]}>
        <View style={[styles.flex1, styles.weatherContent]}>
          <View style={styles.marginBottom12}>
            <Skeleton style={styles.skeletonTopRow} />
            <Skeleton style={styles.skeletonSecondMiddleRow} />
            <Skeleton style={styles.skeletonSecondRow} />
          </View>

          <View style={styles.temperatureInfo}>
            <Text style={styles.tempLabel}>Temperature</Text>
            <View style={styles.tempRange}>
              <Skeleton style={styles.skeletonSecondFirstCol} />
              <Skeleton style={styles.skeletonSecondMiddleCol} />
              <Skeleton style={styles.skeletonSecondFirstCol} />
            </View>
          </View>

          <Skeleton style={styles.skeletonIcon} />
        </View>
      </View>
    );
  }

  if (data.isError) {
    return (
      <View style={[styles.baseSectionContain, styles.alignCenter, style]}>
        <Text style={styles.errorText}>
          Sorry there something wrong with the API
        </Text>
        <Pressable onPress={refresh} style={styles.reloadButton}>
          <Text style={styles.reloadButtonText}>Reload</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <Pressable onPress={nav} style={[styles.baseSectionContain, style]}>
      <View style={[styles.flex1, styles.weatherContent]}>
        <View style={styles.marginBottom12}>
          <Text style={styles.solNumber}>
            Sol {data.data.title}
          </Text>
          <Text style={styles.earthDate}>
            {moment(data.data?.Last_UTC).format('DD/MM/YYYY')}
          </Text>
          <Text style={styles.season}>
            {data.data?.Season}
          </Text>
        </View>

        <View style={styles.temperatureInfo}>
          <Text style={styles.tempLabel}>Temperature</Text>
          <View style={styles.tempRange}>
            <Text style={styles.minTemp}>
              {data.data?.AT.mn}°C
            </Text>
            <Text style={styles.tempDivider}>
              to
            </Text>
            <Text style={styles.maxTemp}>
              {data.data?.AT.mx}°C
            </Text>
          </View>
        </View>

        <View>
          <WeatherConditionDisplay weatherData={data.data} />
        </View>
      </View>
    </Pressable>
  );
};

export default MarsWeather;

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  marginBottom12: {
    marginBottom: 12,
  },
  alignCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'column',
    overflow: 'visible',
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
  errorText: {
    marginTop: 12,
    fontSize: 14,
    color: COLORS.error['400'],
    textAlign: 'center',
  },
  reloadButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: THEME_COLORS.button.primary.background,
  },
  reloadButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: THEME_COLORS.button.primary.text,
  },
  skeletonTopRow: {
    width: 75,
    height: 27,
    backgroundColor: COLORS.primary['600']
  },
  skeletonSecondMiddleRow: {
    width: 76,
    height: 15,
    marginVertical: 2,
    backgroundColor: COLORS.primary['600']
  },
  skeletonSecondRow: {
    width: 76,
    height: 15,
    backgroundColor: COLORS.primary['600']
  },
  skeletonSecondFirstCol: {
    width: 60,
    height: 21,
    marginHorizontal: 2,
    backgroundColor: COLORS.primary['600']
  },
  skeletonSecondMiddleCol: {
    width: 10,
    height: 16,
    backgroundColor: COLORS.primary['600']
  },
  skeletonIcon: {
    width: 64,
    height: 84,
    backgroundColor: COLORS.primary['600']
  },
});
