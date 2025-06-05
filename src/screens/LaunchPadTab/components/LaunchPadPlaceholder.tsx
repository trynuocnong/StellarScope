import {LaunchPadPlaceholderProps} from '../type.ts';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS, THEME_COLORS} from '../../../utils/resources/colors.ts';
import Skeleton from '../../../components/Skeleton.tsx';

const EmptyList = ({onRetry}: {onRetry: () => void}) => {
  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>Seem like no item</Text>
      <TouchableOpacity onPress={onRetry} style={styles.retryButton}>
        <Text style={styles.retryButtonText}>Try again</Text>
      </TouchableOpacity>
    </View>
  );
};

const Placeholder = () => {
  return (
    <View style={styles.container}>
      {[...Array(6)].map((_, index) => (
        <View style={styles.launchItem} key={index}>
          <Skeleton style={styles.launchDate} />
          <View style={styles.launchInfo}>
            <Skeleton style={styles.skeletonTitle} />
            <View style={styles.launchDetails}>
              <Skeleton style={styles.skeletonSub} />
            </View>
          </View>
          <View style={styles.arrowContainer} />
        </View>
      ))}
    </View>
  );
};

const LaunchPadPlaceholder = ({
  currentTab,
  past,
  upcoming,
}: LaunchPadPlaceholderProps) => {
  if (currentTab === 'upcoming') {
    const {refetch, isPending, isRefetching} = upcoming;
    const onRefresh = () => refetch();
    if (isRefetching) {
      return <Placeholder />;
    }
    if (isPending) {
      return <Placeholder />;
    }
    return <EmptyList onRetry={onRefresh} />;
  }
  const {refetch, isPending, isRefetching} = past;
  const onRefresh = () => refetch();
  if (isRefetching) {
    return <Placeholder />;
  }
  if (isPending) {
    return <Placeholder />;
  }
  return <EmptyList onRetry={onRefresh} />;
};

export default LaunchPadPlaceholder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  launchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    marginBottom: 12,
    height: 96,
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
  launchInfo: {
    flex: 1,
    marginRight: 8,
  },
  arrowContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  launchDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  skeletonTitle: {
    width: 250,
    height: 22,
    marginBottom: 4,
  },
  skeletonSub: {
    width: 150,
    height: 16,
    marginRight: 4,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 150,
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.neutral['200'],
    marginBottom: 12,
  },
  retryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: COLORS.primary['300'],
  },
  retryButtonText: {
    color: COLORS.neutral['0'],
    fontSize: 14,
    fontWeight: '600',
  },
});
