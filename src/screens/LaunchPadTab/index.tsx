import React, {useEffect, useState} from 'react';
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
import {LaunchResults} from '../../utils/DTO';
import {LaunchCountdown} from './components/LaunchCountDown.tsx';
import {LaunchCalendar} from './components/LaunchCalendar.tsx';
import {LaunchHistory} from './components/LaunchHistory.tsx';
import {LAUNCH_URL} from '@env';
import AxiosInstance from '../../helper/AxiosInstance.ts';
import {convertLAUNCHAPI} from '../../utils/APIUtils.ts';

export default () => {
  const [upcomingLaunches, setUpcomingLaunches] = useState<LaunchResults[]>([]);
  const [pastLaunches, setPastLaunches] = useState<LaunchResults[]>([]);
  const [selectedLaunch, setSelectedLaunch] = useState<LaunchResults | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'history'>(
    'upcoming',
  );

  useEffect(() => {
    loadLaunchData();
  }, []);

  // Fetch upcoming launches
  const fetchUpcomingLaunches = async () => {
    const endpoint = 'launches/upcoming';
    const params = {limit: 10};
    try {
      // Try to fetch from the actual API
        console.log(convertLAUNCHAPI(endpoint));
        const {data} = await AxiosInstance.get(convertLAUNCHAPI(endpoint), {params: params});
        console.log(data);
        return [];
    } catch (error) {
      throw error;
    }
  };

  // Fetch past launches
  const fetchPastLaunches = async () => {
    const endpoint = '/launch/previous';
    const params = {limit: 10};

    try {
      // Try to fetch from the actual API
      try {
        const queryString = new URLSearchParams(params).toString();
        const response = await fetch(`${LAUNCH_URL}${endpoint}?${queryString}`);
        const data = await response.json();
        console.log(data);

        if (!response.ok) {
          throw new Error('Failed to fetch past launches');
        }

        return data;
      } catch (apiError) {
        console.log(apiError);
      }
    } catch (error) {
      throw error;
    }
  };

  const loadLaunchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch upcoming launches
      const upcomingData = await fetchUpcomingLaunches();
      setUpcomingLaunches(upcomingData.results || []);

      // Set the first upcoming launch as selected by default
      if (upcomingData.results && upcomingData.results.length > 0) {
        setSelectedLaunch(upcomingData.results[0]);
      }

      // Fetch past launches
      const pastData = await fetchPastLaunches();
      setPastLaunches(pastData.results || []);
    } catch (err) {
      console.error('Error fetching launch data:', err);
      setError('Could not load launch data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

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
        {selectedLaunch && !loading && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Next Launch</Text>
            <LaunchCountdown launch={selectedLaunch} />
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
            launches={upcomingLaunches}
            onSelectLaunch={setSelectedLaunch}
            loading={loading}
          />
        ) : loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.primary['400']} />
            <Text style={styles.loadingText}>Loading launch history...</Text>
          </View>
        ) : (
          <LaunchHistory launches={pastLaunches} />
        )}

        {error && (
          <View style={styles.errorContainer}>
            {/*<Ionicons name="alert-circle-outline" size={40} color={COLORS.error['400']} />*/}
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity
              style={styles.retryButton}
              onPress={loadLaunchData}>
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
