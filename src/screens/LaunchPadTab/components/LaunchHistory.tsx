
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Linking } from 'react-native';
import {LaunchResults} from '../../../utils/DTO';
import {COLORS, THEME_COLORS} from '../../../utils/resources/colors.ts';

interface LaunchHistoryProps {
  launches: LaunchResults[];
}

export const LaunchHistory: React.FC<LaunchHistoryProps> = ({ launches }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Success':
        return THEME_COLORS.launchStatus.success;
      case 'Failure':
        return THEME_COLORS.launchStatus.failed;
      default:
        return COLORS.neutral['600'];
    }
  };

  const openVideoLink = (launch: LaunchResults) => {
    if (launch.vidURLs && launch.vidURLs.length > 0) {
      Linking.openURL(launch.vidURLs[0]);
    }
  };

  const renderLaunchItem = ({ item }: { item: LaunchResults }) => (
    <View style={styles.launchItem}>
      <View style={styles.launchHeader}>
        <View style={styles.launchInfo}>
          <Text style={styles.launchName}>{item.name}</Text>
          <Text style={styles.launchDate}>
            {new Date(item.net).toLocaleDateString()}
          </Text>
        </View>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(item.status.name) }
          ]}
        >
          <Text style={styles.statusText}>{item.status.name}</Text>
        </View>
      </View>

      <View style={styles.launchImageContainer}>
        <Image
          source={{ uri: item.image }}
          style={styles.launchImage}
          resizeMode="cover"
        />
        {item.vidURLs && item.vidURLs.length > 0 && (
          <TouchableOpacity
            style={styles.playButton}
            onPress={() => openVideoLink(item)}
          >
            {/*<Ionicons name="play-circle" size={50} color={COLORS.neutral['100']} />*/}
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.launchDetails}>
        <View style={styles.detailRow}>
          {/*<Ionicons name="rocket" size={16} color={COLORS.primary['300']} />*/}
          <Text style={styles.detailText}>{item.rocket.name}</Text>
        </View>
        <View style={styles.detailRow}>
          {/*<Ionicons name="business" size={16} color={COLORS.primary['300']} />*/}
          <Text style={styles.detailText}>{item.launch_service_provider.name}</Text>
        </View>
        {item.mission && (
          <View style={styles.missionContainer}>
            <Text style={styles.missionTitle}>Mission: {item.mission.name}</Text>
            <Text style={styles.missionDescription} numberOfLines={3}>
              {item.mission.description}
            </Text>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Launch History</Text>

      <FlatList
        data={launches}
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
  launchList: {
    paddingBottom: 8,
  },
  launchItem: {
    backgroundColor: THEME_COLORS.cardBackground,
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: THEME_COLORS.cardBorder,
  },
  launchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.primary['50'],
  },
  launchInfo: {
    flex: 1,
  },
  launchName: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.neutral['100'],
    marginBottom: 2,
  },
  launchDate: {
    fontSize: 12,
    color: COLORS.neutral['500'],
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.neutral['100'],
  },
  launchImageContainer: {
    position: 'relative',
    height: 180,
  },
  launchImage: {
    width: '100%',
    height: '100%',
  },
  playButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  launchDetails: {
    padding: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: COLORS.neutral['300'],
    marginLeft: 8,
  },
  missionContainer: {
    marginTop: 8,
    padding: 12,
    backgroundColor: COLORS.primary['10'],
    borderRadius: 8,
  },
  missionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary['300'],
    marginBottom: 4,
  },
  missionDescription: {
    fontSize: 13,
    color: COLORS.neutral['300'],
    lineHeight: 18,
  },
});
