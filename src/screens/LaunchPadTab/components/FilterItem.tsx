import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {COLORS} from '../../../utils/resources/colors.ts';
import {FilterItemProps} from '../type.ts';

const FilterItem = ({setFilterText, filterText, item}: FilterItemProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.filterButton,
        filterText === item && styles.filterButtonActive,
      ]}
      onPress={() => setFilterText(filterText === item ? '' : item)}>
      <Text
        style={[
          styles.filterButtonText,
          filterText === item && styles.filterButtonTextActive,
        ]}>
        {item}
      </Text>
    </TouchableOpacity>
  );
};

export default FilterItem;

const styles = StyleSheet.create({
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: COLORS.secondary['10'],
    marginRight: 8,
    borderWidth: 1,
    borderColor: COLORS.secondary['50'],
  },
  filterButtonActive: {
    backgroundColor: COLORS.secondary['400'],
    borderColor: COLORS.secondary['300'],
  },
  filterButtonText: {
    fontSize: 14,
    color: COLORS.secondary['400'],
    fontWeight: '600',
  },
  filterButtonTextActive: {
    color: COLORS.neutral['100'],
  },
});
