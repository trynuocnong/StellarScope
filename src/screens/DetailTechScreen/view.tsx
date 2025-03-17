import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import ArticleHeader from '../../components/ArticleHeader.tsx';
import FastImage from 'react-native-fast-image';

const DetailTechView = ({data}: {data: string[]}) => {
  return (
    <View  style={styles.container}>
      <ArticleHeader name={data[1]}  />
      <ScrollView contentContainerStyle={styles.contentStyle} showsVerticalScrollIndicator={false}>
        <FastImage
          style={styles.imageStyle}
          source={{uri: data[10]}}
          resizeMode={FastImage.resizeMode.contain}
        />
        {/* Title */}
        <Text style={styles.title}>{data[2]}</Text>

        {/* Metadata */}
        <View style={styles.metaContainer}>
          <Text style={styles.metaText}>ID: {data[0]}</Text>
          <Text style={styles.metaText}>Technology associated with: {data[9]}</Text>
          <Text style={styles.metaText}>Category: {data[5] || 'Unknown'}</Text>
          <Text style={styles.metaText}>Score: {data[12]}</Text>
        </View>

        {/* Description */}
        <Text style={styles.description}>{data[3]}</Text>
      </ScrollView>
    </View>
  );
};

export default DetailTechView;

const styles = StyleSheet.create({
  container: {paddingTop: 32, backgroundColor: '#fff', flex: 1},
  contentStyle: {paddingBottom: 48},
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    marginHorizontal: 12,
  },
  imageStyle: {width: '100%', aspectRatio: 1.25, marginBottom: 8},
  metaContainer: {
    marginBottom: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginHorizontal: 16,
  },
  metaText: {
    fontSize: 14,
    color: '#666',
    textTransform: 'capitalize',
  },
  description: {
    fontSize: 16,
    color: '#444',
    lineHeight: 22,
    textAlign: 'justify',
    marginHorizontal: 12,
  },
});
