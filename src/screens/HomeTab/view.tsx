import React from 'react';
import {Image, ScrollView, StyleSheet, View, Text} from 'react-native';
import UserHeader from '../../components/UserHeader.tsx';
import {FlashList, ListRenderItemInfo} from '@shopify/flash-list';
import FeatureDisplayItem from '../../components/FeatureDisplayItem.tsx';
import {APODRes} from '../../utils/DTO';

export interface HomeTabProps {
  data: APODRes | null;
}

export const featureList = [
  'APOD',
  'Mars Rover Photos',
  'Earth Imagery',
  'Space Mission Tracker',
  'Exoplanet Explorer',
];

const renderFeatureItem = ({item, index}: ListRenderItemInfo<string>) => {
  const onPress = () => {
    console.log('onPress');
  };
  return <FeatureDisplayItem onPress={onPress} name={item} />;
};

const renderSeparator = () => <View style={styles.separator} />;

const HomeTabView = ({data}: HomeTabProps) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      <UserHeader />
      <FlashList
        horizontal
        contentContainerStyle={styles.flatListContentStyle}
        estimatedItemSize={78}
        ItemSeparatorComponent={renderSeparator}
        showsHorizontalScrollIndicator={false}
        data={featureList}
        renderItem={renderFeatureItem}
      />

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Astronomy Picture of the Day</Text>

        <View style={styles.sectionItem}>
          <Image
            style={{width: '100%', height: 336}}
            resizeMode={'stretch'}
            source={{uri: data?.url}}
          />
          <Text style={styles.sectionDateItem}>{data?.date}</Text>
        </View>

        <Text style={styles.sectionItemTitle}>{data?.title}</Text>
        <Text numberOfLines={3} style={styles.sectionItemSubTitle}>
          {data?.explanation}
        </Text>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Mars Rover Collection</Text>
      </View>
    </ScrollView>
  );
};

export default HomeTabView;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    gap: 12,
    paddingBottom: 30,
  },
  separator: {
    width: 12,
    height: 88,
  },
  flatListContentStyle: {
    paddingHorizontal: 12,
  },
  sectionContainer: {
    gap: 8,
    paddingHorizontal: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 700,
    lineHeight: 24,
    color: '#000',
    paddingTop: 16,
    textAlign: 'left',
    justifyContent: 'space-between',
  },
  sectionItem: {
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#000',
    overflow: 'hidden',
  },
  sectionDateItem: {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: 6,
    color: '#fff',
    fontSize: 12,
    lineHeight: 16,
    fontWeight: 700,
    borderTopLeftRadius: 6,
    borderBottomRightRadius: 6,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  sectionItemTitle: {
    fontSize: 16,
    lineHeight: 24,
    color: '#000',
    fontWeight: 700,
    marginBottom: 4,
  },
  sectionItemSubTitle: {
    fontSize: 12,
    lineHeight: 16,
    color: '#000',
    fontWeight: 600,
  },
});
