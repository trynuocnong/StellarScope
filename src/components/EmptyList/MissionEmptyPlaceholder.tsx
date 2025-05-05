import React from 'react';
import {StyleSheet, View} from 'react-native';
import Skeleton from '../Skeleton.tsx';

const MissionEmptyPlaceholder = () => {
  return (
    <View style={styles.container}>
      <View style={styles.missionDetailsContainer}>
        <Skeleton style={styles.missionDetailName} />

        <Skeleton style={styles.missionImage} />
        <View style={styles.missionDescriptionContainer}>
          <Skeleton style={styles.missionDescription} />
          <Skeleton style={styles.missionDescription} />
          <Skeleton style={styles.missionMiniDescription} />
        </View>
      </View>
      <View style={styles.missionDetailsContainer}>
        <Skeleton style={styles.missionDetailName} />

        <Skeleton style={styles.missionImage} />
        <View style={styles.missionDescriptionContainer}>
          <Skeleton style={styles.missionDescription} />
          <Skeleton style={styles.missionDescription} />
          <Skeleton style={styles.missionMiniDescription} />
        </View>
      </View>
      <View style={styles.missionDetailsContainer}>
        <Skeleton style={styles.missionDetailName} />

        <Skeleton style={styles.missionImage} />
        <View style={styles.missionDescriptionContainer}>
          <Skeleton style={styles.missionDescription} />
          <Skeleton style={styles.missionDescription} />
          <Skeleton style={styles.missionMiniDescription} />
        </View>
      </View>
    </View>
  );
};

export default MissionEmptyPlaceholder;

const styles = StyleSheet.create({
  container: {
    gap: 24,
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
  missionDetailName: {
    height: 24,
    width: 150,
    marginBottom: 16,
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
  missionDescriptionContainer: {
    marginBottom: 8,
    gap: 4,
  },
  missionDescription: {
    width: '100%',
    height: 14,
  },
  missionMiniDescription: {
    width: '25%',
    height: 14,
  },
});
