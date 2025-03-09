import React from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import {Text} from '@react-navigation/elements';

export interface UserHeaderProps {
  name?: string;
  image?: any;
}

export default function () {
  const onImagePress = () => {
    console.log('onImagePress');
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={onImagePress}>
        <Image  style={styles.imageStyle} />
      </Pressable>
      <View>
        <Text style={styles.userName}>Heello</Text>
        <Text style={styles.subLine}>Welcome to Stellar Scope</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingTop: 16,
    gap: 12,
    marginTop: 12,
  },
  imageStyle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'red',
  },
  userName: {
    fontSize: 16,
    fontWeight: 700,
    lineHeight: 24,
    color: '#000',
  },
  subLine: {
    fontSize: 12,
    lineHeight: 16,
    color: '#000',
    fontWeight: '400',
  },
});
