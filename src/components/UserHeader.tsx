import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {Text} from '@react-navigation/elements';
import FastImage from 'react-native-fast-image';
import {COLORS} from '../utils/resources/colors.ts';

export default function () {
  const onImagePress = () => {
    console.log('onImagePress');
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={onImagePress}>
        <FastImage
          source={require('./../assets/img/astronaut.webp')}
          style={styles.imageStyle}
        />
      </Pressable>
      <View>
        <Text style={styles.userName}>{'Hello there'}</Text>
        <Text style={styles.subLine}>Welcome to Stellar Scope</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 1000,
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingTop: 32,
    backgroundColor: COLORS.primary['10'],
    paddingBottom: 8,
    gap: 12,
  },
  imageStyle: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userName: {
    fontSize: 16,
    fontWeight: 700,
    lineHeight: 24,
    color: COLORS.neutral['100'],
  },
  subLine: {
    fontSize: 12,
    lineHeight: 16,
    color: COLORS.neutral['300'],
    fontWeight: '400',
  },
});
