
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';
import {LaunchResults} from '../../../utils/DTO';
import {COLORS, THEME_COLORS} from '../../../utils/resources/colors.ts';
interface LaunchCountdownProps {
  launch: LaunchResults;
}

export const LaunchCountdown: React.FC<LaunchCountdownProps> = ({ launch }) => {
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const launchTime = new Date(launch.net).getTime();
      const now = new Date().getTime();
      const difference = launchTime - now;

      if (difference <= 0) {
        // Launch time has passed
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });

        // Check if launch is happening now (within the last 2 hours)
        const hoursAgo = (now - launchTime) / (1000 * 60 * 60);
        setIsLive(hoursAgo < 2 && launch.status.name === 'Upcoming');
        return;
      }

      // Calculate time units
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeRemaining({ days, hours, minutes, seconds });
      setIsLive(false);
    };

    // Calculate immediately
    calculateTimeRemaining();

    // Update every second
    const interval = setInterval(calculateTimeRemaining, 1000);

    // Clean up interval
    return () => clearInterval(interval);
  }, [launch]);

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

  const openWebcast = () => {
    if (launch.vidURLs && launch.vidURLs.length > 0) {
      Linking.openURL(launch.vidURLs[0]);
    }
  };

  const renderCountdown = () => {
    if (isLive) {
      return (
        <View style={styles.liveContainer}>
          <View style={styles.liveIndicator} />
          <Text style={styles.liveText}>LIVE NOW</Text>
          {launch.webcast_live && (
            <TouchableOpacity
              style={styles.watchButton}
              onPress={openWebcast}
            >
              {/*<Ionicons name="play-circle" size={16} color={COLORS.neutral['100']} />*/}
              <Text style={styles.watchButtonText}>Watch</Text>
            </TouchableOpacity>
          )}
        </View>
      );
    }

    if (timeRemaining.days === 0 && timeRemaining.hours === 0 &&
      timeRemaining.minutes === 0 && timeRemaining.seconds === 0) {
      // Launch has passed
      return (
        <View style={styles.pastLaunchContainer}>
          <Text style={styles.pastLaunchText}>
            Launched on {new Date(launch.net).toLocaleDateString()}
          </Text>
          {launch.vidURLs && launch.vidURLs.length > 0 && (
            <TouchableOpacity
              style={styles.replayButton}
              onPress={openWebcast}
            >
              {/*<Ionicons name="play-circle" size={16} color={COLORS.primary['400']} />*/}
              <Text style={styles.replayButtonText}>Replay</Text>
            </TouchableOpacity>
          )}
        </View>
      );
    }

    // Show countdown
    return (
      <View style={styles.countdownContainer}>
        <View style={styles.countdownUnit}>
          <Text style={styles.countdownNumber}>{timeRemaining.days}</Text>
          <Text style={styles.countdownLabel}>DAYS</Text>
        </View>
        <View style={styles.countdownUnit}>
          <Text style={styles.countdownNumber}>{timeRemaining.hours}</Text>
          <Text style={styles.countdownLabel}>HOURS</Text>
        </View>
        <View style={styles.countdownUnit}>
          <Text style={styles.countdownNumber}>{timeRemaining.minutes}</Text>
          <Text style={styles.countdownLabel}>MINS</Text>
        </View>
        <View style={styles.countdownUnit}>
          <Text style={styles.countdownNumber}>{timeRemaining.seconds}</Text>
          <Text style={styles.countdownLabel}>SECS</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.missionInfo}>
          <Text style={styles.missionName}>{launch.name}</Text>
          <View style={styles.statusContainer}>
            <View
              style={[
                styles.statusIndicator,
                { backgroundColor: getStatusColor(launch.status.name) }
              ]}
            />
            <Text style={styles.statusText}>{launch.status.name}</Text>
          </View>
        </View>
        <Image
          source={{ uri: launch.image }}
          style={styles.missionPatch}
          resizeMode="contain"
        />
      </View>

      <View style={styles.details}>
        <View style={styles.detailRow}>
          {/*<Ionicons name="rocket" size={16} color={COLORS.neutral['600']} />*/}
          <Text style={styles.detailText}>{launch.rocket.name}</Text>
        </View>
        <View style={styles.detailRow}>
          {/*<Ionicons name="location" size={16} color={COLORS.neutral['600']} />*/}
          <Text style={styles.detailText}>{launch.pad.name}, {launch.pad.location.country}</Text>
        </View>
        <View style={styles.detailRow}>
          {/*<Ionicons name="calendar" size={16} color={COLORS.neutral['600']} />*/}
          <Text style={styles.detailText}>
            {new Date(launch.net).toLocaleDateString()} at {new Date(launch.net).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </View>
      </View>

      {renderCountdown()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.neutral['100'],
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: COLORS.neutral['0'],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: COLORS.primary['10'],
    borderBottomWidth: 1,
    borderBottomColor: COLORS.primary['50'],
  },
  missionInfo: {
    flex: 1,
  },
  missionName: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.primary['500'],
    marginBottom: 4,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 14,
    color: COLORS.neutral['800'],
  },
  missionPatch: {
    width: 60,
    height: 60,
    marginLeft: 16,
    borderRadius: 30,
    backgroundColor: COLORS.neutral['200'],
  },
  details: {
    padding: 16,
    backgroundColor: COLORS.neutral['100'],
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: COLORS.neutral['800'],
    marginLeft: 8,
  },
  countdownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: COLORS.primary['500'],
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  countdownUnit: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 8,
    borderRadius: 8,
    minWidth: 64,
  },
  countdownNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.neutral['100'],
  },
  countdownLabel: {
    fontSize: 10,
    color: COLORS.neutral['200'],
    marginTop: 2,
  },
  liveContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: COLORS.error['400'],
  },
  liveIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.neutral['100'],
    marginRight: 8,
  },
  liveText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.neutral['100'],
    flex: 1,
  },
  watchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  watchButtonText: {
    fontSize: 14,
    color: COLORS.neutral['100'],
    marginLeft: 4,
  },
  pastLaunchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: COLORS.neutral['200'],
  },
  pastLaunchText: {
    fontSize: 14,
    color: COLORS.neutral['800'],
    flex: 1,
  },
  replayButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.neutral['100'],
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.primary['400'],
  },
  replayButtonText: {
    fontSize: 14,
    color: COLORS.primary['400'],
    marginLeft: 4,
  },
});
