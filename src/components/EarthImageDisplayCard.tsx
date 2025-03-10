import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import {EarthImageRes} from '../utils/DTO';
import {getImage} from '../utils/APIUtils.ts';
import FastImage from 'react-native-fast-image';

const EarthImageDisplayCard = ({image, date}: EarthImageRes) => {
  const path = getImage(date, image);
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.textIdentify}>{image}</Text>
        <Text style={styles.textDate}>{date}</Text>
      </View>

      <FastImage
        style={styles.imageStyle}
        resizeMode={'cover'}
        source={{
          uri: path,
        }}
      />
    </View>
  );
};

export default EarthImageDisplayCard;

const styles = StyleSheet.create({
  container: {
    width: 260,
    height: 160,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#000000',
    borderRadius: 6,
  },
  textContainer: {flex: 1, paddingTop: 15, justifyContent: 'space-between'},
  textIdentify: {
    color: 'white',
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 16,
  },
  textDate: {
    color: 'white',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 20,
  },
  imageStyle: {height: 120, width: 120, marginStart: 8},
});
