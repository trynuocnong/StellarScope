import React from 'react';
import {StyleSheet, View} from 'react-native';
import {MissionPlaceholderProps} from '../type.ts';
import Skeleton from '../../../components/Skeleton.tsx';
import {COLORS, THEME_COLORS} from '../../../utils/resources/colors.ts';

const MissionPlaceholder = ({
  isError,
  error,
  refresh,
  isPending,
}: MissionPlaceholderProps) => {
  if (isPending) {
    return (
      <View>
        <View style={styles.missionDetailsContainer}>
          <Skeleton
            style={styles.skeletonTitle}
          />
          <Skeleton style={styles.skeletonImage} />

          <Skeleton style={styles.skeletonFullSub} />
          <Skeleton style={styles.skeletonFullSub} />
          <Skeleton style={styles.skeletonFullSub} />
          <Skeleton style={styles.skeletonSub} />

        </View>

        <View style={styles.missionDetailsContainer}>
          <Skeleton
            style={styles.skeletonTitle}
          />
          <Skeleton style={styles.skeletonImage} />

          <Skeleton style={styles.skeletonFullSub} />
          <Skeleton style={styles.skeletonFullSub} />
          <Skeleton style={styles.skeletonFullSub} />
          <Skeleton style={styles.skeletonSub} />

        </View>

        <View style={styles.missionDetailsContainer}>
          <Skeleton
            style={styles.skeletonTitle}
          />
          <Skeleton style={styles.skeletonImage} />

          <Skeleton style={styles.skeletonFullSub} />
          <Skeleton style={styles.skeletonFullSub} />
          <Skeleton style={styles.skeletonFullSub} />
          <Skeleton style={styles.skeletonSub} />

        </View>

        <View style={styles.missionDetailsContainer}>
          <Skeleton
            style={styles.skeletonTitle}
          />
          <Skeleton style={styles.skeletonImage} />

          <Skeleton style={styles.skeletonFullSub} />
          <Skeleton style={styles.skeletonFullSub} />
          <Skeleton style={styles.skeletonFullSub} />
          <Skeleton style={styles.skeletonSub} />

        </View>
      </View>
    );
  }

  return <View />;
};

export default MissionPlaceholder;

const styles = StyleSheet.create({
  missionDetailsContainer: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    borderRadius: 18,
    paddingTop: 16,
    paddingStart: 16,
    paddingEnd: 16,
    marginBottom: 24,
  },
  skeletonTitle: {
    width: 120,
    height: 32,
    backgroundColor: THEME_COLORS.primary,
    marginBottom: 16,
  },
  skeletonImage: {
    width: '100%',
    height: 250,
    borderRadius: 4,
    marginBottom: 16,
    backgroundColor: COLORS.primary['600'],
  },
  skeletonSub: {
    width: '80%',
    height: 18,
    backgroundColor: THEME_COLORS.primary,
    marginBottom: 3,
  },
  skeletonFullSub: {
    width: '100%',
    height: 18,
    backgroundColor: THEME_COLORS.primary,
    marginBottom: 3,
  },
});
