import React from 'react';
import {StyleSheet, View} from 'react-native';
import EarthImageDisplayCard from '../EarthImageDisplayCard.tsx';
import {AttitudeQuaternions, CentroidCoordinates, EarthImageRes, SpacePosition} from '../../utils/DTO';
import Skeleton from '../Skeleton.tsx';

const spacePosition: SpacePosition = {
  z: 0,
  y: 0,
  x: 0,
};
const attitude: AttitudeQuaternions = {
  q0: 0,
  q3: 0,
  q2: 0,
  q1: 0,
};
const centroid: CentroidCoordinates = {
  lat: 0,
  lon: 0,
};
const data: EarthImageRes = {
  identifier: '',
  date: '',
  image: '',
  attitude_quaternions: attitude,
  caption: '',
  centroid_coordinates: centroid,
  coords: {
    attitude_quaternions: attitude,
    dscovr_j2000_position: spacePosition,
    lunar_j2000_position: spacePosition,
    centroid_coordinates: centroid,
    sun_j2000_position: spacePosition,
  },
  version: '',
  dscovr_j2000_position: spacePosition,
  lunar_j2000_position: spacePosition,
  sun_j2000_position: spacePosition,
};
const EmptyEarthRowV1 = () => {
  return (
    <View style={styles.container}>
      <Skeleton style={styles.wrapper}>
        <EarthImageDisplayCard {...data} />
      </Skeleton>
      <Skeleton style={styles.wrapper}>
        <EarthImageDisplayCard {...data} />
      </Skeleton>
    </View>
  );
};

export default EmptyEarthRowV1;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 12,
  },
  wrapper: {
    borderRadius: 8,
  },
})
;
