import React from 'react';
import {Image, Pressable, StyleSheet} from 'react-native';
import {Text} from '@react-navigation/elements';

export interface FeaturesDisplayItemProps {
  name: string;
  onPress: () => void;
}

const FeatureDisplayItem = ({name, onPress}: FeaturesDisplayItemProps) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Image style={styles.iconContainer} />
      <Text style={styles.featureName}>{name}</Text>
    </Pressable>
  );
};

export default React.memo(FeatureDisplayItem);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 4,
    paddingVertical: 4,
    borderWidth: 1,
    alignItems: 'center',
    borderColor: 'rgba(0,0,0,0.1)',
    borderRadius: 6,
    gap: 4,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  featureName: {
    width: 70,
    height: 28,
    fontSize: 10,
    lineHeight: 14,
    fontWeight: 600,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
