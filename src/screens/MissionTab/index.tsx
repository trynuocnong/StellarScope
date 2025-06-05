import React, {useCallback, useRef, useState, useTransition} from 'react';
import {
  InteractionManager,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Mission} from '../../utils/DTO/MissionDTO.ts';
import {SafeAreaView} from 'react-native-safe-area-context';
import {KeyValue, navRef, ROUTES} from '../../navigation';
import {THEME_COLORS} from '../../utils/resources/colors.ts';
import {FlashList, ListRenderItemInfo} from '@shopify/flash-list';
import FastImage from 'react-native-fast-image';
import {extractImageUrlFromHTML} from '../../utils/FuncUtils.ts';
import {SEARCH_TERM} from './mock.ts';
import MissionPlaceholder from './components/MissionPlaceholder.tsx';
import {useInfiniteQuery} from '@tanstack/react-query';
import {fetchMission} from './utils.ts';

export default function () {
  const [category, setCategory] = useState<KeyValue>(SEARCH_TERM[0]);
  const flashRef = useRef<FlashList<Mission>>(null);
  const [, startTransition] = useTransition();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    refetch,
    isPending,
    isError,
    error,
    isRefetching,
  } = useInfiniteQuery({
    queryKey: ['mission', category],
    queryFn: ({pageParam}) =>
      fetchMission(pageParam, category.value.toString()),
    initialPageParam: 1,
    getNextPageParam: lastPage =>
      +lastPage.page < +lastPage.pages ? +lastPage.page + 1 : undefined,
  });

  const handleRefresh = async () => {
    refetch();
  };

  const onEndReached = async () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const renderCategories = useCallback(
    (term: KeyValue, index: number) => {
      const onPress = () => {
        try {
          flashRef.current?.scrollToIndex({animated: true, index: 0});
          InteractionManager.runAfterInteractions(() => {
            startTransition(() => {
              setCategory(term);
            });
          });
        } catch (apiError) {
          console.log(apiError);
        }
      };
      const isSelected = term.value === category.value;
      return (
        <TouchableOpacity
          onPress={onPress}
          key={`${term.label}${term.value}${index}`}>
          <Text
            style={[
              styles.categoryText,
              styles.categoryUnselected,
              isSelected && styles.categorySelected,
            ]}>
            {term.label}
          </Text>
        </TouchableOpacity>
      );
    },
    [category],
  );

  const renderMissionDetails = useCallback(
    ({item}: ListRenderItemInfo<Mission>) => {
      const toWeb = () => {
        navRef.current?.navigate(ROUTES.WEBVIEW_SCREEN, {url: item.link});
      };
      return (
        <TouchableOpacity
          onPress={toWeb}
          style={styles.missionDetailsContainer}>
          <View style={styles.missionHeader}>
            <Text style={styles.missionDetailName}>{item.title}</Text>
          </View>

          <FastImage
            source={{uri: extractImageUrlFromHTML(item.markup)}}
            style={styles.missionImage}
            resizeMode="cover"
          />

          {item.desc ? (
            <Text style={styles.missionDescription}>{item.desc}</Text>
          ) : (
            <></>
          )}
        </TouchableOpacity>
      );
    },
    [],
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Mission Tracker</Text>
        <Text style={styles.subtitle}>
          Monitor NASA's active space missions
        </Text>
      </View>

      <View style={styles.categoryContainer}>
        {SEARCH_TERM.map(renderCategories)}
      </View>

      <FlashList
        ref={flashRef}
        contentContainerStyle={styles.flashListContent}
        renderItem={renderMissionDetails}
        scrollEnabled={!!data}
        data={data?.pages.flatMap(page => page.posts) || []}
        refreshing={isRefetching}
        keyExtractor={(item, index) => `${item.title}-${index}`}
        onEndReachedThreshold={0.4}
        estimatedItemSize={100}
        ListEmptyComponent={
          <MissionPlaceholder
            isPending={isPending}
            isError={isError}
            error={error}
            refresh={handleRefresh}
          />
        }
        onEndReached={onEndReached}
        onRefresh={handleRefresh}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME_COLORS.background,
  },
  categoryContainer: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    backgroundColor: THEME_COLORS.cardBackground,
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 4,
    borderWidth: 2,
    borderColor: THEME_COLORS.cardBorder,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: '600',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    overflow: 'hidden',
  },
  categorySelected: {
    backgroundColor: THEME_COLORS.primary,
    color: THEME_COLORS.button.primary.text,
  },
  flashListContent: {
    paddingBottom: 24,
    paddingHorizontal: 16,
  },
  categoryUnselected: {
    backgroundColor: THEME_COLORS.cardBackground,
    color: THEME_COLORS.textTertiary,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0f0f1e',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#a0a0b9',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0f0f1e',
    padding: 20,
  },
  errorText: {
    marginTop: 16,
    fontSize: 16,
    color: '#ff4757',
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#4e5ff8',
    borderRadius: 8,
  },
  retryButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  header: {
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: 'white',
  },
  subtitle: {
    fontSize: 16,
    color: '#a0a0b9',
    marginTop: 4,
  },
  missionList: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  missionItem: {
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
    width: 150,
  },
  selectedMissionItem: {
    backgroundColor: '#4e5ff8',
  },
  missionItemContent: {
    justifyContent: 'center',
  },
  missionName: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginBottom: 8,
  },
  selectedMissionName: {
    color: 'white',
  },
  missionStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  missionStatus: {
    fontSize: 12,
    color: '#a0a0b9',
  },
  selectedMissionStatus: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  missionDetailsContainer: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    borderRadius: 18,
    paddingTop: 16,
    paddingStart: 16,
    paddingEnd: 16,
    marginBottom: 24,
  },
  missionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  missionDetailName: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
    flex: 1,
  },
  missionDetailStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  missionDetailStatus: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },
  missionImage: {
    width: '100%',
    height: 250,
    borderRadius: 4,
    marginBottom: 16,
  },
  missionDescription: {
    fontSize: 16,
    lineHeight: 24,
    color: THEME_COLORS.text,
    textAlign: 'justify',
    marginBottom: 8,
  },
  missionDates: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  dateContainer: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 12,
    marginRight: 10,
  },
  dateLabel: {
    fontSize: 12,
    color: '#a0a0b9',
    marginBottom: 4,
  },
  dateValue: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressLabelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  progressPercentage: {
    fontSize: 16,
    fontWeight: '700',
    color: '#4e5ff8',
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4e5ff8',
    borderRadius: 4,
  },
  milestonesContainer: {
    marginTop: 8,
  },
  milestonesTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
    marginBottom: 16,
  },
  milestoneItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  milestoneIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  completedMilestone: {
    backgroundColor: '#4cd964',
  },
  pendingMilestone: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  milestoneContent: {
    flex: 1,
  },
  milestoneTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginBottom: 4,
  },
  milestoneDate: {
    fontSize: 14,
    color: '#a0a0b9',
  },
});
