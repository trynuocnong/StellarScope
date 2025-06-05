import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, ListRenderItemInfo, StyleSheet} from 'react-native';
import {COLORS, THEME_COLORS} from '../../utils/resources/colors.ts';
import {SafeAreaView} from 'react-native-safe-area-context';
import {LaunchResponse, LaunchResults} from '../../utils/DTO';
import {KEY_QUERIES} from './mock.tsx';
import {DefaultError, useQueries, UseQueryResult} from '@tanstack/react-query';
import {fetchPastLaunches, fetchUpcomingLaunches} from './utils.tsx';
import {KeyValue} from '../../navigation';
import {LaunchPadActiveType} from './type.ts';
import LaunchTabHeader from './components/LaunchTabHeader.tsx';
import LaunchItem from './components/LaunchItem.tsx';
import LaunchPadPlaceholder from './components/LaunchPadPlaceholder.tsx';

export default () => {
  const [selectedLaunch, setSelectedLaunch] = useState<
    LaunchResults | undefined
  >();
  const [filter, setFilter] = useState<string>('');
  const [activeTab, setActiveTab] = useState<LaunchPadActiveType>('upcoming');
  const result = useQueries({
    queries: [
      {queryKey: [KEY_QUERIES.UPCOMING, 1], queryFn: fetchUpcomingLaunches},
      {queryKey: [KEY_QUERIES.PAST, 2], queryFn: fetchPastLaunches},
    ],
  });

  const onOption = (k: KeyValue) => {
    setActiveTab(k.value as LaunchPadActiveType);
  };

  const [upcoming, past]: [
    UseQueryResult<LaunchResponse, DefaultError>,
    UseQueryResult<LaunchResponse, DefaultError>,
  ] = result;

  const data = (): LaunchResults[] => {
    let results: LaunchResults[] = [];

    if (activeTab === 'upcoming') {
      results = upcoming.data?.results || [];
    } else {
      results = past.data?.results || [];
    }

    if (filter) {
      return results.filter(item =>
        item.launch_service_provider.name
          .toLowerCase()
          .includes(filter.toLowerCase()),
      );
    }
    return results;
  };

  const totalData = (): LaunchResults[] => {
    if (activeTab === 'upcoming') {
      return upcoming.data?.results || [];
    }
    return past.data?.results || [];
  };

  const renderItem = useCallback((info: ListRenderItemInfo<LaunchResults>) => {
    const onPress = (item: LaunchResults) => {
      setSelectedLaunch(item);
    };
    return <LaunchItem {...info} onPress={onPress} />;
  }, []);

  useEffect(() => {
    if (!selectedLaunch && upcoming.status === 'success') {
      if (upcoming.data.results) {
        setSelectedLaunch(upcoming.data.results[0]);
      }
    }
  }, [selectedLaunch, upcoming.data?.results, upcoming.status]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <FlatList
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        keyExtractor={item => item.id}
        refreshing={
          activeTab === 'upcoming' ? upcoming.isRefetching : past.isRefetching
        }
        ListHeaderComponent={
          <LaunchTabHeader
            filter={filter}
            setFilterText={setFilter}
            launchResults={totalData()}
            selectLaunch={selectedLaunch}
            onOption={onOption}
          />
        }
        ListEmptyComponent={
          <LaunchPadPlaceholder
            upcoming={upcoming}
            past={past}
            currentTab={activeTab}
          />
        }
        data={data()}
        renderItem={renderItem}
      />

      {/*{activeTab === 'upcoming' ? (*/}
      {/*  <LaunchCalendar*/}
      {/*    launches={upcoming.data?.results || []}*/}
      {/*    onSelectLaunch={setSelectedLaunch}*/}
      {/*    loading={upcoming.isPending}*/}
      {/*  />*/}
      {/*) : upcoming.isPending ? (*/}
      {/*  <View style={styles.loadingContainer}>*/}
      {/*    <ActivityIndicator size="large" color={COLORS.primary['400']} />*/}
      {/*    <Text style={styles.loadingText}>Loading launch history...</Text>*/}
      {/*  </View>*/}
      {/*) : (*/}
      {/*  <LaunchHistory launches={past.data?.results || []} />*/}
      {/*)}*/}

      {/*{upcoming.error && (*/}
      {/*  <View style={styles.errorContainer}>*/}
      {/*    /!*<Ionicons name="alert-circle-outline" size={40} color={COLORS.error['400']} />*!/*/}
      {/*    <Text style={styles.errorText}>{`${upcoming.error}`}</Text>*/}
      {/*    <TouchableOpacity*/}
      {/*      style={styles.retryButton}*/}
      {/*      onPress={() => upcoming.refetch}>*/}
      {/*      <Text style={styles.retryButtonText}>Retry</Text>*/}
      {/*    </TouchableOpacity>*/}
      {/*  </View>*/}
      {/*)}*/}
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
});
