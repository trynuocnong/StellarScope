import React from 'react';
import {Dimensions, FlatList, StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {getImage} from '../utils/APIUtils.ts';
import {FlashList} from '@shopify/flash-list';
import {RouteProp, useRoute} from '@react-navigation/native';
import {PARAMS} from '../navigation';
const screenWidth = Dimensions.get('window').width;

export default function(){
  const {data, position} = useRoute<RouteProp<PARAMS, 'Tester'>>().params;
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
          <FlashList
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled={true}
            estimatedItemSize={screenWidth}
            data={data.marsRP?.filter(item => item.img_src)}
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
