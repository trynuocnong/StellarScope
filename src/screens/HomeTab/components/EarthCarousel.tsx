import React, {useCallback} from 'react';
import {
  Dimensions,
  FlatList,
  ListRenderItemInfo,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {EarthImageRes} from '../../../utils/DTO';
import {getImage} from '../../../utils/APIUtils.ts';
import {THEME_COLORS} from '../../../utils/resources/colors.ts';
import ImagePrefix from '../../../components/ImagePrefix.tsx';
import {EarthCarouselProps} from '../type.ts';
import {DefaultError, UseQueryResult} from '@tanstack/react-query';
import Skeleton from '../../../components/Skeleton.tsx';
import {AlertCircleSVG} from '../../../assets/svg';

const WIDTH = Dimensions.get('screen').width;
const EARTH_IMAGE_HEIGHT = WIDTH * 0.6;
const EARTH_IMAGE_WIDTH = WIDTH - 24 - 32;

const RenderSkeleton = (
  mock: UseQueryResult<EarthImageRes[], DefaultError>,
) => {
  const {data, isPending, isError, refetch, error} = mock;
  const refresh = () => refetch();
  if (isPending) {
    return <Skeleton style={styles.skeletonContainer} />;
  }
  if (!data || isError) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load: {error.message}</Text>
        <AlertCircleSVG width={32} height={32} fill={THEME_COLORS.error} />
        <Text
          onPress={refresh}
          style={[styles.reloadText, styles.reloadButton]}>
          Reload
        </Text>
      </View>
    );
  }
  return <></>;
};

const RenderError = ({path}: {path: string}) => {
  return (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>Failed to load image.</Text>
      <Text style={styles.errorPath}>{path}</Text>
      <Text style={[styles.reloadText, styles.reloadButton]}>Reload</Text>
    </View>
  );
};

const renderEarthImage = ({item}: ListRenderItemInfo<EarthImageRes>) => {
  const path = getImage(item.date, item.image);
  return (
    <ImagePrefix
      style={styles.sectionEarthImage}
      resizeMode={'contain'}
      source={{uri: path}}
      errorNode={<RenderError path={path} />}
    />
  );
};

const calItemLayout = (
  _: ArrayLike<EarthImageRes> | null | undefined,
  index: number,
) => ({
  length: 16,
  offset: 16 * index,
  index,
});

const EarthCarousel = ({style, data}: EarthCarouselProps) => {
  const [itemIndex, setItemIndex] = React.useState(0);
  const curIndex = React.useRef(itemIndex);
  const indicatorRef = React.useRef<FlatList>(null);

  React.useEffect(() => {
    try {
      if (data.data) {
        indicatorRef.current?.scrollToIndex({
          index: itemIndex,
          animated: true,
          viewPosition: 0.5,
        });
      }
    } catch (e) {
      console.error('e', e);
    }
  }, [data, itemIndex]);

  const onScroll = React.useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const slideSize = e.nativeEvent.layoutMeasurement.width;
      const item = e.nativeEvent.contentOffset.x / slideSize;
      const roundIndex = Math.round(item);
      const space = Math.abs(roundIndex - item);
      const distance = space > 0.4;
      if (roundIndex !== curIndex.current && !distance) {
        curIndex.current = roundIndex;
        setItemIndex(roundIndex);
      }
    },
    [],
  );

  const renderItemIndicator = useCallback(
    ({index}: ListRenderItemInfo<EarthImageRes>) => {
      return (
        <View
          key={index}
          style={[
            styles.indicator,
            index === itemIndex
              ? styles.indicatorActive
              : styles.indicatorInactive,
          ]}
        />
      );
    },
    [itemIndex],
  );

  return (
    <View style={[styles.baseSectionContain, style]}>
      <View style={styles.sectionEarthImageContainer}>
        <FlatList
          horizontal
          data={data.data ?? []}
          maxToRenderPerBatch={2}
          pagingEnabled={true}
          ListEmptyComponent={<RenderSkeleton {...data} />}
          renderItem={renderEarthImage}
          onScroll={onScroll}
        />
        <View style={styles.indicatorContainer}>
          <FlatList
            scrollEnabled={false}
            ref={indicatorRef}
            style={styles.indicatorRenderBox}
            horizontal
            getItemLayout={calItemLayout}
            showsHorizontalScrollIndicator={false}
            data={data.data ?? []}
            renderItem={renderItemIndicator}
          />
        </View>
      </View>
    </View>
  );
};

export default EarthCarousel;

const styles = StyleSheet.create({
  sectionEarthImage: {
    width: EARTH_IMAGE_WIDTH,
    height: EARTH_IMAGE_HEIGHT,
    backgroundColor: THEME_COLORS.black,
  },
  skeletonContainer: {
    width: EARTH_IMAGE_WIDTH,
    height: EARTH_IMAGE_HEIGHT,
  },
  baseSectionContain: {
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
    backgroundColor: '#1a1a2e',
    paddingTop: 12,
    overflow: 'hidden',
    marginHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    padding: 16,
  },
  sectionEarthImageContainer: {
    height: EARTH_IMAGE_HEIGHT,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  indicatorContainer: {
    position: 'absolute',
    bottom: 5,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicatorRenderBox: {
    maxWidth: 80,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },

  indicatorActive: {
    backgroundColor: THEME_COLORS.primary,
  },

  indicatorInactive: {
    backgroundColor: THEME_COLORS.textSecondary,
    opacity: 0.5,
  },
  errorContainer: {
    backgroundColor: THEME_COLORS.background,
    padding: 10,
  },
  errorText: {
    color: 'red',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  errorPath: {
    color: '#444',
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'center',
  },
  reloadButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#cc0000',
    borderRadius: 4,
  },
  reloadText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
