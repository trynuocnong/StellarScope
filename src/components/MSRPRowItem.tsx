import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {MarsPhoto} from '../utils/DTO';
import FastImage from 'react-native-fast-image';
import {COLORS} from '../utils/resources/colors.ts';

const MSRPRowItem = ({id, img_src, earth_date, rover, camera}: MarsPhoto) => {
  return (
    <View key={id} style={styles.container}>
      <FastImage style={styles.imageStyle} source={{uri: img_src}} />
      <View style={styles.flex1}>
        <Text numberOfLines={1} style={styles.itemTile}>
          Rover: {rover.name}
        </Text>
        <Text numberOfLines={1} style={styles.subTitle}>
          {camera.full_name}
        </Text>
      </View>

      <Text style={styles.dateStyle}>{earth_date}</Text>
    </View>
  );
};

export default React.memo(MSRPRowItem);

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
    gap: 8,
    borderBottomColor: COLORS.neutral['400'],
    borderBottomWidth: 1,
  },
  flex1: {flex: 1},
  imageStyle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.neutral['500'],
  },
  itemTile: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 600,
    color: COLORS.neutral['100'],
  },
  subTitle: {
    flex: 1,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: 600,
    color: COLORS.neutral['500'],
  },
  dateStyle: {fontSize: 14, lineHeight: 20, fontWeight: 700, color: COLORS.neutral['100']},
});
