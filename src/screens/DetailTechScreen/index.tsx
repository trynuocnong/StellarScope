import React from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';
import {PARAMS} from '../../navigation';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import ArticleHeader from '../../components/ArticleHeader.tsx';
import {ReImage} from '../../../App.tsx';
import FastImage from 'react-native-fast-image';
import {THEME_COLORS} from '../../utils/resources/colors.ts';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function () {
  const {data} = useRoute<RouteProp<PARAMS, 'DetailedTech'>>().params;
  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <ArticleHeader name={data[1]} />
      <ScrollView
        contentContainerStyle={styles.contentStyle}
        showsVerticalScrollIndicator={false}>
        {data[10] ? (
          <ReImage
            sharedTransitionTag={data[10]}
            style={styles.imageStyle}
            source={{uri: data[10]}}
            resizeMode={FastImage.resizeMode.contain}
          />
        ) : (
          <></>
        )}

        {/* Title */}
        <Text style={styles.title}>{data[2]}</Text>

        {/* Metadata */}
        <View style={styles.metaContainer}>
          <Text style={styles.metaText}>
            ID: <Text style={styles.metaTextContent}>{data[0]}</Text>
          </Text>
          <Text style={styles.metaText}>
            Technology associated with:{' '}
            <Text style={styles.metaTextContent}>{data[9]}</Text>
          </Text>
          <Text style={styles.metaText}>
            Category:{' '}
            <Text style={styles.metaTextContent}>{data[5] || 'Unknown'}</Text>
          </Text>
          <Text style={styles.metaText}>
            Score: <Text style={styles.metaTextContent}>{data[12]}</Text>
          </Text>
        </View>

        {/* Description */}
        <Text style={styles.description}>{data[3]}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME_COLORS.background,
  },
  contentStyle: {paddingBottom: 48},
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: THEME_COLORS.text,
    marginBottom: 8,
    marginTop: 12,
    marginHorizontal: 12,
  },
  imageStyle: {width: '100%', aspectRatio: 1.25, marginBottom: 8},
  metaContainer: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 24,
    backgroundColor: '#1a1a2e',
    borderRadius: 8,
    marginHorizontal: 16,
  },
  metaText: {
    fontSize: 14,
    color: THEME_COLORS.accent,
    textTransform: 'capitalize',
    fontWeight: 'bold',
  },
  metaTextContent: {
    fontSize: 14,
    color: THEME_COLORS.text,
    textTransform: 'capitalize',
  },
  description: {
    fontSize: 16,
    color: THEME_COLORS.textSecondary,
    lineHeight: 22,
    textAlign: 'justify',
    marginHorizontal: 12,
  },
});
