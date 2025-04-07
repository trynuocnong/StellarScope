import * as React from 'react';
import {useCallback} from 'react';
import FeatureDisplayItem from '../../components/FeatureDisplayItem.tsx';
import {APODRes, EarthImageRes, MarsPhoto} from '../../utils/DTO';
import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {navRef, ROUTES} from '../../navigation';
import Animated, {
  LinearTransition,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import DynamicImage from '../../components/DynamicImage.tsx';
import {COLORS} from '../../utils/resources/colors.ts';
import {featureList} from './mock.ts';
import UserHeader from '../../components/UserHeader.tsx';
import AxiosInstance from '../../helper/AxiosInstance.ts';
import {API_ENDPOINT, convertAPI} from '../../utils/APIUtils.ts';
import {baseAPIParams} from '../../navigation/RootApp.tsx';
import {useQuery} from '@tanstack/react-query';
import {RePressable} from '../../../App.tsx';
import EarthImageDisplayCard from '../../components/EarthImageDisplayCard.tsx';
import MSRPRowItem from '../../components/MSRPRowItem.tsx';

const fetchAPOD = async (): Promise<APODRes> => {
  const {data} = await AxiosInstance.get(convertAPI(API_ENDPOINT.APOD), {
    params: baseAPIParams,
  });
  return data;
};

const fetchTech = async (): Promise<string[][]> => {
  const {data} = await AxiosInstance.get(
    convertAPI(API_ENDPOINT.TECH_TRANSFER.PATENT),
    {
      params: {...baseAPIParams, space: ''},
    },
  );
  return data.results;
};

const fetchEarthImage = async (): Promise<EarthImageRes[]> => {
  const {data} = await AxiosInstance.get(convertAPI(API_ENDPOINT.EARTH_IMAGE), {
    params: baseAPIParams,
  });
  return data;
};

const fetchMarRover = async (): Promise<MarsPhoto[]> => {
  const {data} = await AxiosInstance.get(convertAPI(API_ENDPOINT.MSRP), {
    params: {...baseAPIParams, sol: 1},
  });
  return data.photos;
};

const renderEarthImage = ({item}: ListRenderItemInfo<EarthImageRes>) => {
  return <EarthImageDisplayCard {...item} />;
};

const renderMarsRoverPhoto = ({item}: any) => {
  return <MSRPRowItem {...item} />;
};

export const ReFlatList = Animated.createAnimatedComponent(FlatList<any>);
export default () => {
  const padTop = useSharedValue(80);
  const updatePadTop = (num: number) => {
    console.log('height', num);
    padTop.value = withTiming(num - 30);
  };

  const {data: apod} = useQuery<APODRes>({
    queryKey: ['apod'],
    queryFn: fetchAPOD,
  });

  const {data: earthImage} = useQuery<EarthImageRes[]>({
    queryKey: ['tech'],
    queryFn: fetchEarthImage,
  });

  const {data: marRover = []} = useQuery<MarsPhoto[]>({
    queryKey: ['marRover'],
    queryFn: fetchMarRover,
  });

  const {data: tech} = useQuery<string[][]>({
    queryKey: ['tech'],
    queryFn: fetchTech,
  });

  const displayAPODDetails = () => {
    if (apod) {
      navRef.current?.navigate(ROUTES.DETAIL_APOD_SCREEN, {data: apod});
    }
  };

  const flatListAnimatedStyle = useAnimatedStyle(() => ({
    top: padTop.value,
  }));

  const renderHeader = useCallback(() => {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.actionContainer}>
          <View style={styles.logoActionHighlight}>
            <Text style={styles.logoTextHighlight}>🚀</Text>
          </View>

          <View style={styles.actionHolderContain}>
            {featureList.map(item => (
              <FeatureDisplayItem
                key={item.name}
                name={item.name}
                icon={item.icon}
                onPress={item.onPress}
              />
            ))}
          </View>
        </View>
        <View
          style={styles.headerLayer}
        />
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>
            Earth Polychromatic Imaging Camera
          </Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.flatListContentStyle}
            data={earthImage}
            renderItem={renderEarthImage}
          />
        </View>
      </View>
    );
  }, [earthImage]);

  return (
    <Animated.View
      layout={LinearTransition.springify().damping(10)}
      style={styles.container}>
      <UserHeader />
      <RePressable
        onPress={displayAPODDetails}
        style={styles.imageHeaderContainer}>
        <DynamicImage uri={apod?.url ?? ''} onHeightChange={updatePadTop} />
      </RePressable>
      <ReFlatList
        layout={LinearTransition.springify().damping(15)}
        ListHeaderComponent={renderHeader}
        style={[styles.mainContent, flatListAnimatedStyle]}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 32}}
        data={marRover}
        renderItem={renderMarsRoverPhoto}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary['600'],
  },
  mainContent: {
    gap: 16,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
  },
  headerContainer: {
    paddingTop: 45,
    paddingBottom: 28,
    flexDirection: 'column',
    overflow: 'visible',
  },
  actionContainer: {
    left: 0,
    right: 0,
    marginHorizontal: 16,
    backgroundColor: COLORS.primary['500'],
    borderRadius: 16,
    paddingBottom: 20,
    elevation: 15,
    shadowColor: COLORS.neutral['50'],
    shadowOpacity: 0.5,
    shadowRadius: 16,
  },
  logoActionHighlight: {
    alignSelf: 'center',
    position: 'absolute',
    top: -20,
    backgroundColor: COLORS.primary['500'],
    padding: 15,
    borderRadius: 45,
  },
  logoTextHighlight: {fontSize: 25, textAlign: 'center'},
  imageHeaderContainer: {
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    overflow: 'hidden',
  },
  actionHolderContain: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 45,
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: 15,
  },
  flatListContentStyle: {
    gap: 12,
    paddingStart: 12,
    paddingEnd: 16,
  },
  headerLayer: {
    ...StyleSheet.absoluteFillObject,
    top: 140,
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: -1,
    backgroundColor: COLORS.primary['600'],
  },
  sectionContainer: {
    paddingVertical: 16,
    gap: 8,
    backgroundColor: COLORS.primary['600'],
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 700,
    lineHeight: 24,
    color: COLORS.neutral['100'],
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
  sectionItemImage: {width: '100%', height: 330},
  sectionDateItem: {
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
  crossPlacement: {alignItems: 'flex-end', paddingTop: 30},
  portalSubContainer: {flex: 1, paddingHorizontal: 5},
  portalExistButton: {
    padding: 5,
    margin: 10,
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
    flex: 1,
    fontSize: 16,
    textAlign: 'justify',
    color: 'white',
    paddingHorizontal: 6,
  },
  portalContent: {paddingBottom: 24},
  portalScrollStyle: {marginBottom: 29},
  portalDownloadButton: {
    marginHorizontal: 8,
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    backgroundColor: '#5a6bff',
  },
  portalDownloadButtonText: {fontSize: 18, fontWeight: 700, color: '#ffffff'},
});
