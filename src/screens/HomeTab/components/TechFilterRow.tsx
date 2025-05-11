import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {TECHTRANSFER_FILTER} from '../mock.ts';
import {TechFilterRowProps} from '../../ListScreens/type.ts';

const TechFilterRow = ({
  techFilter,
  setTechFilter,
  style,
}: TechFilterRowProps) => {
  return (
    <View style={[styles.container, style]}>
      {TECHTRANSFER_FILTER.map(item => {
        const isSelected = item.value === techFilter.value;
        const onPress = () => {
          if (!isSelected) {
            setTechFilter(item);
          }
        };
        return (
          <TouchableOpacity
            style={[
              styles.techFilterButton,
              isSelected && styles.selectedTechFilterButton,
            ]}
            key={item.value.toString()}
            onPress={onPress}>
            <Text
              style={[
                styles.techFilterButtonText,
                isSelected && styles.selectedTechFilterButtonText,
              ]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default React.memo(TechFilterRow);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  techFilterButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    marginHorizontal: 4,
    borderRadius: 8,
  },
  selectedTechFilterButton: {
    backgroundColor: '#4e5ff8',
  },
  techFilterButtonText: {
    color: '#a0a0b9',
    fontWeight: '600',
    marginLeft: 6,
    fontSize: 13,
  },
  selectedTechFilterButtonText: {
    color: 'white',
  },
});
