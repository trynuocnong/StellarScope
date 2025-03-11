import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';

const TechTransferColItem = ({data}: {data: string[] }) => {
  return (
    <View style={styles.container}>
      <FastImage
        style={styles.imageStyle}
        source={{
          uri: data[10],
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View style={styles.textStyle}>
        <Text numberOfLines={1} style={styles.subTitle}>{data[5]}</Text>
        <Text style={styles.title}>{data[4]}</Text>
      </View>
    </View>
  );
};

export default React.memo(TechTransferColItem);

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 210,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    overflow: 'hidden',
  },
  imageStyle: {width: 150, height: 150},
  textStyle: {
    width: 150,
    height: 60,
    padding: 8,
    gap: 4,
    backgroundColor: 'white',
  },
  subTitle: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: 400,
    textTransform: 'capitalize',
  },
  title: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: 600,
    textTransform: 'uppercase',
  },
});
