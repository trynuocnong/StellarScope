import React from 'react';
import {
  FlatList,
  ListRenderItemInfo as FlatListRenderItemInfo,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import UserHeader from '../../components/UserHeader.tsx';
import {FlashList, ListRenderItemInfo} from '@shopify/flash-list';
import FeatureDisplayItem from '../../components/FeatureDisplayItem.tsx';
import {APODRes} from '../../utils/DTO';
import {
  MarsPhoto,
  MarsRoverPhotoRes,
} from '../../utils/DTO/marsRoverPhotoDTO.ts';
import MSRPRowItem from '../../components/MSRPRowItem.tsx';
import EarthImageDisplayCard from '../../components/EarthImageDisplayCard.tsx';
import {EarthImageRes} from '../../utils/DTO/EarthImageDTO.ts';
import FastImage from 'react-native-fast-image';

export interface HomeTabProps {
  apod: APODRes;
  msrp: MarsRoverPhotoRes;
  earthImage: EarthImageRes[];
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

const renderMarsRoverPhoto = ({item}: ListRenderItemInfo<MarsPhoto>) => {
  return <MSRPRowItem {...item} />;
};

const renderEarthImage = ({item}: FlatListRenderItemInfo<EarthImageRes>) => {
  return <EarthImageDisplayCard {...item} />;
};

const renderSeparator = () => <View style={styles.separator} />;
const renderSeparator2 = () => <View style={styles.separator2} />;

const renderSeparator3 = () => <View style={styles.separator3} />;

const HomeTabView = ({apod, msrp, earthImage}: HomeTabProps) => {
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

        <View style={styles.sectionItemContainer}>
          <View style={styles.sectionItem}>
            <FastImage
              style={styles.sectionItemImage}
              resizeMode={'stretch'}
              source={{uri: apod?.url}}
            />
            <Text style={styles.sectionDateItem}>{apod?.date}</Text>
          </View>

          <View style={styles.sectionItemTextContainer}>
            <Text style={styles.sectionItemTitle}>{apod?.title}</Text>
            <Text numberOfLines={3} style={styles.sectionItemSubTitle}>
              {apod?.explanation}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>
          Earth Polychromatic Imaging Camera
        </Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={earthImage}
          renderItem={renderEarthImage}
          ItemSeparatorComponent={renderSeparator3}
        />
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Mars Rover Collection</Text>

        <FlashList
          data={msrp.photos.slice(0, 4)}
          scrollEnabled={false}
          estimatedItemSize={60}
          renderItem={renderMarsRoverPhoto}
          ListEmptyComponent={renderSeparator2}
          showsHorizontalScrollIndicator={false}
        />
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
  separator2: {borderBottomWidth: 1, borderColor: 'rgba(0,0,0,0.05)'},
  separator3: {
    width: 12,
    height: 160,
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
  sectionItemContainer: {
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    gap: 8,
  },
  sectionItem: {
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    overflow: 'hidden',
  },
  sectionItemImage: {width: '100%', height: 336},
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
  sectionItemTextContainer: {gap: 4, padding: 12},
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
