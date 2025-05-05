import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {Text} from '@react-navigation/elements';
import FastImage from 'react-native-fast-image';
import {COLORS, THEME_COLORS} from '../utils/resources/colors.ts';

export interface FeaturesDisplayItemProps {
  icon: string;
  name: string;
  onPress: () => void;
}

const FeatureDisplayItem = ({name, onPress, icon}: FeaturesDisplayItemProps) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.iconContainer} >
        <Text style={styles.iconText}>{icon}</Text>
      </View>
      <Text numberOfLines={1} style={styles.featureName}>{name}</Text>
    </Pressable>
  );
};

export default React.memo(FeatureDisplayItem);

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    paddingBottom: 2,
    borderWidth: 1,
    alignItems: 'center',
    backgroundColor:  THEME_COLORS.button.primary.background,
    borderColor: THEME_COLORS.button.primary.border,
    elevation: 15,
    borderRadius: 6,
  },
  iconContainer: {
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    backgroundColor: THEME_COLORS.primaryDark,
    overflow: 'hidden',
  },
  iconText: {
    fontSize: 18,
    lineHeight: 22,
  },
  featureName: {
    width: 70,
    height: 28,
    fontSize: 10,
    lineHeight: 14,
    paddingHorizontal: 2,
    fontWeight: 600,
    color: THEME_COLORS.text,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
