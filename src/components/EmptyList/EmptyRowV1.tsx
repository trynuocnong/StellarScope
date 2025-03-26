import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Skeleton from '../Skeleton.tsx';

export default function EmptyRowV1() {
  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <Skeleton>
          <View style={styles.imageStyle} />
        </Skeleton>
        <View style={styles.textStyle}>
          <Skeleton>
            <Text numberOfLines={1} style={styles.subTitle}>
              SomeThing to Display
            </Text>
          </Skeleton>
          <Skeleton>
            <Text style={styles.title}>Tech's name</Text>
          </Skeleton>
        </View>
      </View>

      <View style={styles.itemContainer}>
        <Skeleton>
          <View style={styles.imageStyle} />
        </Skeleton>
        <View style={styles.textStyle}>
          <Skeleton>
            <Text numberOfLines={1} style={styles.subTitle}>
              SomeThing to Display
            </Text>
          </Skeleton>
          <Skeleton>
            <Text style={styles.title}>Tech's name</Text>
          </Skeleton>
        </View>
      </View>

      <View style={styles.itemContainer}>
        <Skeleton>
          <View style={styles.imageStyle} />
        </Skeleton>
        <View style={styles.textStyle}>
          <Skeleton>
            <Text numberOfLines={1} style={styles.subTitle}>
              SomeThing to Display
            </Text>
          </Skeleton>
          <Skeleton>
            <Text style={styles.title}>Tech's name</Text>
          </Skeleton>
        </View>
      </View>

      <View style={styles.itemContainer}>
        <Skeleton>
          <View style={styles.imageStyle} />
        </Skeleton>
        <View style={styles.textStyle}>
          <Skeleton>
            <Text numberOfLines={1} style={styles.subTitle}>
              SomeThing to Display
            </Text>
          </Skeleton>
          <Skeleton>
            <Text style={styles.title}>Tech's name</Text>
          </Skeleton>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
  },
  itemContainer: {
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
