import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {Text} from '@react-navigation/elements';
import FastImage from 'react-native-fast-image';
import {useSelector} from 'react-redux';
import {selectAvatar, selectName} from '../redux/selectors/globalSelector.ts';

export default function () {
  const onImagePress = () => {
    console.log('onImagePress');
  };
  const avatar = useSelector(selectAvatar);
  const name = useSelector(selectName);

  return (
    <View style={styles.container}>
      <Pressable onPress={onImagePress}>
        <FastImage
          source={
            avatar !== ''
              ? {uri: avatar}
              : require('./../assets/img/astronaut.webp')
          }
          style={styles.imageStyle}
        />
      </Pressable>
      <View>
        <Text style={styles.userName}>{name || 'Hello there'}</Text>
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
