import React from 'react';
import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import {COLORS, THEME_COLORS} from '../../../utils/resources/colors.ts';
import SegmentButtonRow from '../../../components/SegmentButtonRow.tsx';
import {navRef, ROUTES} from '../../../navigation';
import FastImage from 'react-native-fast-image';
import {TechTransferProps} from '../type.ts';

const renderTechItem = ({item}: {item: any}) => {
  const goToTechDetail = () => {
    navRef.current?.navigate(ROUTES.DETAIL_TECH_SCREEN, {data: item});
  };
  return (
    <Pressable onPress={goToTechDetail} style={styles.techItemContainer}>
      <View style={styles.techItemContent}>
        <Text style={styles.techItemTitle} numberOfLines={2}>
          {item[2]}
        </Text>
        <Text style={styles.techItemDescription} numberOfLines={3}>
          {item[3]}
        </Text>
        <View style={styles.techItemFooter}>
          <Text style={styles.learnMoreText}>Learn more</Text>
        </View>
      </View>
      <FastImage
        source={{uri: item[10]}}
        style={styles.techItemImage}
        resizeMode="cover"
      />
    </Pressable>
  );
};

const TechTransfer = ({style, data, refresh, options, onSelect}: TechTransferProps) => {
  if (data.isPending) {
    return (
      <View style={styles.baseSectionContain}>
        <SegmentButtonRow
          incompatibleSpace={56}
          style={styles.segmentStyle}
          options={options}
          onSelect={onSelect}
          layerColor={'#4e5ff8'}
          textColor={COLORS.neutral['100']}
        />
        <View style={styles.lisTechContainer}>
          <View style={styles.techItemContainer} />
          <View style={styles.techItemContainer} />
          <View style={styles.techItemContainer} />
        </View>
      </View>
    );
  }

  if (data.isError) {
    return (
      <View style={[styles.baseSectionContain, styles.alignCenter]}>
        <SegmentButtonRow
          incompatibleSpace={56}
          style={styles.segmentStyle}
          options={options}
          onSelect={onSelect}
          layerColor={'#4e5ff8'}
          textColor={COLORS.neutral['100']}
        />
        <Text style={styles.errorText}>Sorry there something wrong with the API</Text>
        <Pressable onPress={refresh} style={styles.reloadButton}>
          <Text style={styles.reloadButtonText}>Reload</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={[styles.baseSectionContain, style]}>
      <SegmentButtonRow
        incompatibleSpace={56}
        style={styles.segmentStyle}
        options={options}
        onSelect={onSelect}
        layerColor={'#4e5ff8'}
        textColor={COLORS.neutral['100']}
      />
      <FlatList
        scrollEnabled={false}
        data={data.data || []}
        renderItem={renderTechItem}
        style={styles.lisTechContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default TechTransfer;

const styles = StyleSheet.create({
  segmentStyle: {
    marginBottom: 10,
    backgroundColor: COLORS.neutral['900'],
    borderRadius: 8,
    height: 55,
  },
  alignCenter: {
    justifyContent: 'center',
    alignItems: 'center',
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
  lisTechContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  techItemContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
  },
  techItemContent: {
    flex: 1,
    padding: 12,
  },
  techItemTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
    marginBottom: 4,
  },
  techItemDate: {
    fontSize: 12,
    color: '#a0a0b9',
    marginBottom: 8,
  },
  techItemDescription: {
    fontSize: 14,
    color: '#d1d1e0',
    lineHeight: 20,
  },
  techItemFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  learnMoreText: {
    color: '#4e5ff8',
    fontWeight: '600',
    fontSize: 13,
    marginRight: 4,
  },
  techItemImage: {
    width: 100,
    height: '100%',
  },
  errorText: {
    marginTop: 12,
    fontSize: 14,
    color: COLORS.error['400'],
    textAlign: 'center',
  },
  reloadButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: THEME_COLORS.button.primary.background,
  },
  reloadButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: THEME_COLORS.button.primary.text,
  },
});
