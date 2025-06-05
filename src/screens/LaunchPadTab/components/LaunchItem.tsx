import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {getStatusColor} from '../utils.tsx';
import {COLORS, THEME_COLORS} from '../../../utils/resources/colors.ts';
import {ArrowNextSVG} from '../../../assets/svg';
import {LaunchItemProps} from '../type.ts';

const LaunchItem = ({item, onPress}: LaunchItemProps) => {
  const launchDate = new Date(item.net);
  const month = launchDate
    .toLocaleString('default', {month: 'short'})
    .toUpperCase();
  const day = launchDate.getDate();
  const statusColor = getStatusColor(item.status.name);
  const onItemPress = () => {
    onPress(item);
  };

  return (
    <TouchableOpacity onPress={onItemPress} style={styles.launchItem}>
      <View style={styles.launchDate}>
        <Text style={styles.launchMonth}>{month}</Text>
        <Text style={styles.launchDay}>{day}</Text>
        <View
          style={[styles.statusIndicator, {backgroundColor: statusColor}]}
        />
      </View>

      <View style={styles.launchInfo}>
        <Text style={styles.launchName} numberOfLines={1}>
          {item.name}
        </Text>
        <View style={styles.launchDetails}>
          <View style={styles.launchProvider}>
            <Text style={styles.providerName} numberOfLines={1}>
              {item.launch_service_provider.name}
            </Text>
          </View>
          <View style={styles.launchStatus}>
            <Text style={styles.statusText}>{item.status.name}</Text>
          </View>
        </View>
      </View>

      <View style={styles.arrowContainer}>
        <ArrowNextSVG width={20} height={20} fill={COLORS.neutral['400']} />
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(LaunchItem);

const styles = StyleSheet.create({
  launchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    marginBottom: 12,
    padding: 12,
    borderWidth: 1,
    marginHorizontal: 16,
    borderColor: THEME_COLORS.cardBorder,
    shadowColor: COLORS.neutral['0'],
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  launchDate: {
    width: 60,
    height: 70,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: COLORS.primary['500'],
  },
  launchMonth: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.neutral['100'],
    marginBottom: 2,
  },
  launchDay: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.neutral['100'],
  },
  statusIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 6,
  },
  launchInfo: {
    flex: 1,
    marginRight: 8,
  },
  launchName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.neutral['100'],
    marginBottom: 4,
  },
  launchDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  launchProvider: {
    flex: 1,
    marginRight: 8,
  },
  providerName: {
    fontSize: 12,
    color: COLORS.neutral['500'],
  },
  launchStatus: {
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 12,
    backgroundColor: COLORS.neutral['1000'],
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.neutral['400'],
  },
  arrowContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
