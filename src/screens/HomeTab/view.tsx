import React, {useCallback, useMemo, useState} from 'react';
import {
  Dimensions,
  FlatList,
  ListRenderItemInfo as FlatListRenderItemInfo,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import UserHeader from '../../components/UserHeader.tsx';
import {FlashList, ListRenderItemInfo} from '@shopify/flash-list';
import FeatureDisplayItem from '../../components/FeatureDisplayItem.tsx';
import {EarthImageRes, MarsPhoto} from '../../utils/DTO';
import MSRPRowItem from '../../components/MSRPRowItem.tsx';
import EarthImageDisplayCard from '../../components/EarthImageDisplayCard.tsx';
import FastImage from 'react-native-fast-image';
import TechTransferColItem from '../../components/TechTransferColItem.tsx';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import {Portal} from 'react-native-portalize';
import {CrossSVG} from '../../assets/svg';
import {HomeStateProps} from '../../redux/reducer/HomeReducer.ts';
import {getImage} from '../../utils/APIUtils.ts';

const screenWidth = Dimensions.get('window').width;

export interface TPortalDetailProps {
  data: Partial<HomeStateProps> | null;
  index?: number;
}

export const featureList = [
  'APOD',
  'Mars Rover Photos',
  'Earth Imagery',
  'Space Mission Tracker',
  'Exoplanet Explorer',
];

const renderFeatureItem = ({item}: FlatListRenderItemInfo<string>) => {
  const onPress = () => {
    console.log('onPress');
  };
  return <FeatureDisplayItem onPress={onPress} name={item} />;
};

const renderSeparator = () => <View style={styles.separator} />;
const renderSeparator2 = () => <View style={styles.separator2} />;

const renderSeparator3 = () => <View style={styles.separator3} />;
const renderSeparator4 = () => <View style={styles.separator4} />;

const HomeTabView = ({apod, marsRP, earthPhotos, tech}: HomeStateProps) => {
  const [ucd, setUCD] = useState<Partial<HomeStateProps> | null>(null);
  const [position, setPosition] = useState<number>(0);
  const onExistUCD = () => setUCD(null);
  const memoizedUCD = useMemo(() => ucd, [ucd]);
  const renderEarthImage = useCallback(
    ({item, index}: FlatListRenderItemInfo<EarthImageRes>) => {
      const _onPress = () => {
        setUCD({earthPhotos});
        setPosition(index);
      };
      return (
        <Pressable onPress={_onPress}>
          <EarthImageDisplayCard {...item} />
        </Pressable>
      );
    },
    [earthPhotos],
  );

  const renderMarsRoverPhoto = useCallback(
    ({item, index}: ListRenderItemInfo<MarsPhoto>) => {
      const _onPress = () => {
        setUCD({marsRP});
        setPosition(index);
      };
      return (
        <Pressable onPress={_onPress}>
          <MSRPRowItem {...item} />
        </Pressable>
      );
    },
    [marsRP],
  );

  const renderTech = useCallback(
    ({item, index}: FlatListRenderItemInfo<string[]>) => {
      const _onPress = () => {
        setUCD({tech});
        setPosition(index);
      };
      return (
        <Pressable onPress={_onPress}>
          <TechTransferColItem data={item} />
        </Pressable>
      );
    },
    [tech],
  );

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      <UserHeader />
      <FlatList
        horizontal
        contentContainerStyle={[styles.flatListContentStyle, styles.spaceTop]}
        ItemSeparatorComponent={renderSeparator}
        showsHorizontalScrollIndicator={false}
        data={featureList}
        renderItem={renderFeatureItem}
      />

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>TechTransfer</Text>

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={renderSeparator4}
          contentContainerStyle={styles.flatListContentStyle}
          renderItem={renderTech}
          data={tech.slice(0, 15)}
        />
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Astronomy Picture of the Day</Text>

        <Pressable
          onPress={() => setUCD({apod})}
          style={styles.sectionItemContainer}>
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
        </Pressable>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>
          Earth Polychromatic Imaging Camera
        </Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatListContentStyle}
          data={earthPhotos}
          renderItem={renderEarthImage}
          ItemSeparatorComponent={renderSeparator3}
        />
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Mars Rover Collection</Text>

        <FlashList
          data={marsRP.slice(0, 4)}
          scrollEnabled={false}
          estimatedItemSize={60}
          renderItem={renderMarsRoverPhoto}
          ListEmptyComponent={renderSeparator2}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <Portal>
        {ucd && (
          <Animated.View
            style={styles.portalContainer}
            entering={FadeIn}
            exiting={FadeOut}>
            <View style={styles.portalHeader}>
              <Pressable onPress={onExistUCD} style={styles.portalExistButton}>
                <CrossSVG />
              </Pressable>
            </View>
            <View style={styles.portalSubContainer}>
              <Pressable
                onPress={onExistUCD}
                style={[StyleSheet.absoluteFill, styles.portalBackground]}
              />
              <PortalDetail index={position} data={memoizedUCD} />
            </View>
          </Animated.View>
        )}
      </Portal>
    </ScrollView>
  );
};

export default HomeTabView;

const PortalDetail = ({data, index = 0}: TPortalDetailProps) => {
  if (data) {
    switch (true) {
      case !!data.apod: {
        const url = data.apod!.url;
        return (
          <View style={styles.flex1}>
            <FastImage
              style={styles.portalAPODImageDisplay}
              resizeMode="contain"
              source={{uri: url}}
            />
            <View style={styles.portalAPODTextContainer}>
              <Text style={styles.portalAPODTitleDisplay}>
                {data.apod!.title}
              </Text>

              <Text style={styles.portalAPODDateDisplay}>
                {data.apod!.date}
              </Text>

              <Text style={styles.portalAPODDescriptionDisplay}>
                {data.apod!.explanation}
              </Text>
            </View>
          </View>
        );
      }
      case !!data.earthPhotos: {
        return (
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled={true}
            data={data.earthPhotos}
            renderItem={({item}) => {
              const name = item.image;
              const date = item.date;
              return (
                <View>
                  <FastImage
                    style={styles.portalImageDisplay}
                    resizeMode="contain"
                    source={{uri: getImage(date, name)}}
                  />
                </View>
              );
            }}
          />
        );
      }
      case !!data.marsRP: {
        return (
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled={true}
            data={data.marsRP}
            renderItem={({item}) => {
              const {img_src, earth_date, rover, camera, id, sol} = item;
              return (
                <View key={id} >
                  <FastImage style={styles.portalImageDisplay} source={{uri: img_src}} />
                </View>
              );
            }}
          />
        );
      }
      case !!data.tech: {
        return <View />;
      }
      default:
        return <View />;
    }
  } else {
    return <></>;
  }
};
const styles = StyleSheet.create({
  flex1: {flex: 1},
  container: {
    backgroundColor: '#ffffff',
    gap: 12,
    paddingBottom: 30,
    paddingTop: 20,
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
  separator4: {
    width: 8,
    height: 210,
  },
  spaceTop: {
    marginTop: 16,
  },
  flatListContentStyle: {
    paddingHorizontal: 12,
  },
  sectionContainer: {
    gap: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 700,
    lineHeight: 24,
    color: '#000',
    paddingTop: 16,
    textAlign: 'left',
    justifyContent: 'space-between',
    marginHorizontal: 12,
  },
  sectionItemContainer: {
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    marginHorizontal: 12,
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
  portalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  portalHeader: {alignItems: 'flex-end', paddingTop: 12},
  portalSubContainer: {flex: 1, paddingHorizontal: 5},
  portalExistButton: {
    padding: 5,
    margin: 10,
  },
  portalImageDisplay: {
    width: screenWidth,
    height: 'auto',
    aspectRatio: 1,
  },
  portalAPODImageDisplay: {
    width: '100%',
    height: 'auto',
    aspectRatio: 1024 / 683,
  },
  portalAPODTextContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 45,
  },
  portalBackground: {backgroundColor: 'rgba(0,0,0,0.1)'},
  portalAPODTitleDisplay: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'white',
    paddingHorizontal: 6,
  },
  portalAPODDateDisplay: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 10,
    paddingHorizontal: 6,
  },
  portalAPODDescriptionDisplay: {
    fontSize: 16,
    textAlign: 'justify',
    color: 'white',
    paddingHorizontal: 6,
  },
});
