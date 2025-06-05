import React, {useCallback} from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {COLORS} from '../../../utils/resources/colors.ts';
import {LaunchCountdown} from './LaunchCountDown.tsx';
import SegmentButtonRow from '../../../components/SegmentButtonRow.tsx';
import {LAUNCHPAD_OPTIONS} from '../mock.tsx';
import FilterItem from './FilterItem.tsx';
import {LaunchTabHeaderProps} from '../type.ts';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';

const LaunchTabHeader = ({
  selectLaunch,
  onOption,
  launchResults,
  setFilterText,
  filter,
}: LaunchTabHeaderProps) => {
  const providers = Array.from(
    new Set(launchResults.map(launch => launch.launch_service_provider.name)),
  );

  const renderFilterItem = useCallback(
    ({item}: ListRenderItemInfo<string>) => {
      return (
        <FilterItem
          item={item}
          setFilterText={setFilterText}
          filterText={filter}
        />
      );
    },
    [filter, setFilterText],
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Launchpad</Text>
        <Text style={styles.subtitle}>Track rocket launches in real-time</Text>
      </View>

      <View style={styles.scrollContent}>
        {selectLaunch ? (
          <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.section}>
            <Text style={styles.sectionTitle}>Next Launch</Text>
            <LaunchCountdown launch={selectLaunch} />
          </Animated.View>
        ) : (
          <></>
        )}

        {/*<View style={styles.notificationsContainer}>*/}
        {/*  <View style={styles.notificationsTextContainer}>*/}
        {/*    <NotifyOutLineSVG*/}
        {/*      width={20}*/}
        {/*      height={20}*/}
        {/*      fill={*/}
        {/*        notificationsEnabled*/}
        {/*          ? COLORS.accent['400']*/}
        {/*          : COLORS.neutral['600']*/}
        {/*      }*/}
        {/*    />*/}
        {/*    <Text style={styles.notificationsText}>Launch Notifications</Text>*/}
        {/*  </View>*/}
        {/*  <Switch*/}
        {/*    trackColor={{*/}
        {/*      false: COLORS.neutral['1000'],*/}
        {/*      true: COLORS.accent['50'],*/}
        {/*    }}*/}
        {/*    thumbColor={*/}
        {/*      notificationsEnabled*/}
        {/*        ? COLORS.accent['400']*/}
        {/*        : COLORS.neutral['500']*/}
        {/*    }*/}
        {/*    ios_backgroundColor={COLORS.neutral['1000']}*/}
        {/*    onValueChange={toggleNotifications}*/}
        {/*    value={notificationsEnabled}*/}
        {/*  />*/}
        {/*</View>*/}

        <SegmentButtonRow
          style={styles.segmentStyle}
          options={LAUNCHPAD_OPTIONS}
          incompatibleSpace={32}
          layerColor={'#4e5ff8'}
          onSelect={onOption}
          textColor={COLORS.neutral['100']}
        />

        <FlatList
          horizontal
          data={providers}
          renderItem={renderFilterItem}
          keyExtractor={item => item}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterContainer}
        />
      </View>
    </View>
  );
};

export default React.memo(LaunchTabHeader);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
  },
  filterContainer: {
    paddingBottom: 12,
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
  scrollContent: {
    paddingHorizontal: 16,
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
  segmentStyle: {
    marginBottom: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 8,
    height: 55,
  },
});
