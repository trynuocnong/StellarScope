
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {LaunchResults} from '../../../utils/DTO';
import {COLORS, THEME_COLORS} from '../../../utils/resources/colors.ts';

interface LaunchCalendarProps {
  launches: LaunchResults[];
  onSelectLaunch: (launch: LaunchResults) => void;
  loading?: boolean;
}

export const LaunchCalendar: React.FC<LaunchCalendarProps> = ({ launches, onSelectLaunch, loading = false }) => {
  const [filter, setFilter] = useState<string | null>(null);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  // Get unique providers for filtering
  const providers = Array.from(new Set(launches.map(launch => launch.launch_service_provider.name)));

  // Filter launches based on selected provider
  const filteredLaunches = filter
    ? launches.filter(launch => launch.launch_service_provider.name === filter)
    : launches;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Success':
        return THEME_COLORS.launchStatus.success;
      case 'Upcoming':
        return THEME_COLORS.launchStatus.upcoming;
      case 'Delayed':
        return THEME_COLORS.launchStatus.delayed;
      case 'Scrubbed':
      case 'Failure':
        return THEME_COLORS.launchStatus.failed;
      default:
        return THEME_COLORS.launchStatus.upcoming;
    }
  };

  const handleLaunchPress = (launch: LaunchResults) => {
    // Call the onSelectLaunch prop for backward compatibility
    onSelectLaunch(launch);

    // Navigate to the detail screen
    navigation.navigate('LaunchDetail', { launch });
  };

  const renderFilterItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={[
        styles.filterButton,
        filter === item && styles.filterButtonActive
      ]}
      onPress={() => setFilter(filter === item ? null : item)}
    >
      <Text
        style={[
          styles.filterButtonText,
          filter === item && styles.filterButtonTextActive
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  const renderLaunchItem = ({ item }: { item: LaunchResults }) => {
    // Get month abbreviation and day
    const launchDate = new Date(item.net);
    const month = launchDate.toLocaleString('default', { month: 'short' }).toUpperCase();
    const day = launchDate.getDate();

    // Get status color
    const statusColor = getStatusColor(item.status.name);

    return (
      <TouchableOpacity
        style={styles.launchItem}
        onPress={() => handleLaunchPress(item)}
      >
        <View style={[styles.launchDate, { backgroundColor: COLORS.primary['500'] }]}>
          <Text style={styles.launchMonth}>{month}</Text>
          <Text style={styles.launchDay}>{day}</Text>
          <View style={[styles.statusIndicator, { backgroundColor: statusColor }]} />
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
          {/*<Ionicons name="chevron-forward" size={20} color={COLORS.neutral['400']} />*/}
        </View>
      </TouchableOpacity>
    );
  };

  // if (loading) {
  //   return <LaunchCalendarSkeleton />;
  // }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Launch Calendar</Text>

      <FlatList
        horizontal
        data={providers}
        renderItem={renderFilterItem}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterContainer}
      />

      <FlatList
        data={filteredLaunches}
        renderItem={renderLaunchItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.launchList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.neutral['100'],
    marginBottom: 12,
  },
  filterContainer: {
    paddingBottom: 12,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: COLORS.secondary['10'],
    marginRight: 8,
    borderWidth: 1,
    borderColor: COLORS.secondary['50'],
  },
  filterButtonActive: {
    backgroundColor: COLORS.secondary['400'],
    borderColor: COLORS.secondary['300'],
  },
  filterButtonText: {
    fontSize: 14,
    color: COLORS.secondary['400'],
    fontWeight: '600',
  },
  filterButtonTextActive: {
    color: COLORS.neutral['100'],
  },
  launchList: {
    paddingBottom: 8,
  },
  launchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME_COLORS.cardBackground,
    borderRadius: 16,
    marginBottom: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: THEME_COLORS.cardBorder,
    shadowColor: COLORS.neutral['0'],
    shadowOffset: { width: 0, height: 2 },
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
