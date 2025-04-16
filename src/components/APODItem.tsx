import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../utils/resources/colors.ts';
import FastImage from 'react-native-fast-image';
import {APODRes} from '../utils/DTO';

const APODItem = ({
  title,
  url,
  service_version,
  media_type,
  date,
  copyright,
}: Omit<APODRes, 'explanation' | 'hdurl'>) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.flex1}>
          <Text
            numberOfLines={1}
            style={styles.nameStyle}>
            {copyright || 'NO COPYRIGHT'}
          </Text>
          <Text style={styles.dateStyle}>{date}</Text>
        </View>
        <Pressable>
          <Text>More</Text>
        </Pressable>
      </View>
      <FastImage style={styles.imageStyle} source={{uri: url}} />
      <Text style={styles.title}>{title}</Text>
      <View style={styles.tagRowContainer}>
        <View style={styles.tagContainer}>
          <Text style={styles.tagText}>{service_version}</Text>
        </View>
        <View style={styles.tagContainer}>
          <Text style={styles.tagText}>{media_type}</Text>
        </View>
      </View>
    </View>
  );
};

export default APODItem;

const styles = StyleSheet.create({
  flex1: {flex: 1},
  container: {
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.neutral['50'],
    width: 338,
    backgroundColor: COLORS.primary['500'],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingTop: 11,
    paddingBottom: 8,
  },
  nameStyle: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: 500,
    color: COLORS.neutral['100'],
  },
  dateStyle: {
    fontSize: 10,
    lineHeight: 14,
    fontWeight: 400,
    color: COLORS.neutral['300'],
  },
  imageStyle: {width: 336, height: 336, backgroundColor: COLORS.neutral['700']},
  title: {
    fontSize: 16,
    paddingTop: 12,
    lineHeight: 16,
    fontWeight: 700,
    paddingHorizontal: 12,
    color: COLORS.neutral['100'],
  },
  tagRowContainer: {
    paddingHorizontal: 12,
    paddingBottom: 12,
    gap: 8,
    alignSelf: 'flex-start',
    flexDirection: 'row',
  },
  tagContainer: {
    paddingVertical: 2,
    borderWidth: 0.5,
    paddingHorizontal: 4,
    backgroundColor: COLORS.primary['400'],
    borderColor: COLORS.neutral['10'],
    borderRadius: 2,
  },
  tagText: {
    fontSize: 12,
    fontWeight: 400,
    lineHeight: 16,
    color: COLORS.neutral['300'],
  },
});
