import React, {useState} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS, THEME_COLORS} from '../../utils/resources/colors.ts';
import {SafeAreaView} from 'react-native-safe-area-context';
import {LaunchResponse, LaunchResults} from '../../utils/DTO';
import {LaunchCalendar} from './components/LaunchCalendar.tsx';
import {LaunchHistory} from './components/LaunchHistory.tsx';
import AxiosInstance from '../../helper/AxiosInstance.ts';
import {convertLAUNCHAPI, LAUNCH_API_ENDPOINT} from '../../utils/APIUtils.ts';
import {KEY_QUERIES, mockLaunchResponse} from './mock.tsx';
import {useQueries, UseQueryResult} from '@tanstack/react-query';

const fetchUpcomingLaunches = async (): Promise<LaunchResponse> => {
  const params = {limit: 10};
  try {
    const {data} = await AxiosInstance.get<LaunchResponse>(convertLAUNCHAPI(LAUNCH_API_ENDPOINT.LAUNCHES.UPCOMING), {
      params: params,
    });
    return data;
  } catch (apiError) {
    console.log(apiError);
    return mockLaunchResponse;
  }
};

// Fetch past launches
const fetchPastLaunches = async (): Promise<LaunchResponse> => {
  const params = {limit: 10};
  try {
    const {data} = await AxiosInstance.get<LaunchResponse>(convertLAUNCHAPI(LAUNCH_API_ENDPOINT.LAUNCHES.UPCOMING), {
      params: params,
    });
    return data;
  } catch (apiError) {
    return mockLaunchResponse;
  }
};

export default () => {
  const [selectedLaunch, setSelectedLaunch] = useState<LaunchResults | null>(
    null,
  );
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'history'>(
    'upcoming',
  );

  const result = useQueries({
    queries: [
      {queryKey: [KEY_QUERIES.UPCOMING, 1], queryFn: fetchUpcomingLaunches},
      {queryKey: [KEY_QUERIES.PAST, 2], queryFn: fetchPastLaunches},
    ],
  });

  const [upcoming, past]: [
    UseQueryResult<LaunchResponse, unknown>,
    UseQueryResult<LaunchResponse, unknown>,
  ] = result;

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
    // In a real app, you would register/unregister for push notifications here
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Launchpad</Text>
        <Text style={styles.subtitle}>Track rocket launches in real-time</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Next Launch Countdown */}
        {upcoming.data && !upcoming.isPending && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Next Launch</Text>
            {/*<LaunchCountdown launch={selectedLaunch} />*/}
          </View>
        )}

        {/* Notifications Toggle */}
        <View style={styles.notificationsContainer}>
          <View style={styles.notificationsTextContainer}>
            {/*<Ionicons name="notifications" size={20} color={notificationsEnabled ? COLORS.accent['400'] : COLORS.neutral['600']} />*/}
            <Text style={styles.notificationsText}>Launch Notifications</Text>
          </View>
          <Switch
            trackColor={{
              false: COLORS.neutral['1000'],
              true: COLORS.accent['50'],
            }}
            thumbColor={
              notificationsEnabled
                ? COLORS.accent['400']
                : COLORS.neutral['500']
            }
            ios_backgroundColor={COLORS.neutral['1000']}
            onValueChange={toggleNotifications}
            value={notificationsEnabled}
          />
        </View>

        {/* Tabs for Upcoming/History */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'upcoming' && styles.activeTab]}
            onPress={() => setActiveTab('upcoming')}>
            <Text
              style={[
                styles.tabText,
                activeTab === 'upcoming' && styles.activeTabText,
              ]}>
              Upcoming
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'history' && styles.activeTab]}
            onPress={() => setActiveTab('history')}>
            <Text
              style={[
                styles.tabText,
                activeTab === 'history' && styles.activeTabText,
              ]}>
              History
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        {activeTab === 'upcoming' ? (
          <LaunchCalendar
            launches={upcoming.data?.results || []}
            onSelectLaunch={setSelectedLaunch}
            loading={upcoming.isPending}
          />
        ) : upcoming.isPending ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.primary['400']} />
            <Text style={styles.loadingText}>Loading launch history...</Text>
          </View>
        ) : (
          <LaunchHistory launches={upcoming.data?.results || []} />
        )}

        {upcoming.error && (
          <View style={styles.errorContainer}>
            {/*<Ionicons name="alert-circle-outline" size={40} color={COLORS.error['400']} />*/}
            <Text style={styles.errorText}>{`${upcoming.error}`}</Text>
            <TouchableOpacity
              style={styles.retryButton}
              onPress={() => upcoming.refetch}>
              <Text style={styles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME_COLORS.background,
  },
  loadingContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: COLORS.neutral['400'],
  },
  errorContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary['10'],
    borderRadius: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: COLORS.primary['50'],
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
    backgroundColor: THEME_COLORS.button.primary.background,
    borderRadius: 8,
  },
  retryButtonText: {
    color: THEME_COLORS.button.primary.text,
    fontWeight: '600',
    fontSize: 16,
  },
  header: {
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.neutral['100'],
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.neutral['500'],
    marginTop: 4,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.neutral['100'],
    marginBottom: 12,
  },
  notificationsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.primary['10'],
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.primary['50'],
  },
  notificationsTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationsText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.neutral['100'],
    marginLeft: 8,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary['10'],
    borderRadius: 12,
    marginBottom: 16,
    padding: 4,
    borderWidth: 1,
    borderColor: COLORS.primary['50'],
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: COLORS.primary['500'],
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.neutral['400'],
  },
  activeTabText: {
    color: COLORS.neutral['100'],
  },
});
