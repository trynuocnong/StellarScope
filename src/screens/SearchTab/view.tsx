import React, {useCallback, useMemo, useRef, useState} from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {QuestionSVG} from '../../assets/svg';
import Toast from 'react-native-toast-message';
import {KeyValue} from '../../navigation';
import {dropDownEndPoint, options} from './utils.ts';
import DropDownPicker from 'react-native-dropdown-picker';

const SearchTabView = () => {
  // for search keyword
  const [values, setValues] = useState<string>('');
  const [inInput, setInInput] = useState<boolean>(false);
  const isIn = () => setInInput(true);
  const isOut = () => setInInput(false);
  const [tag, setTag] = useState<KeyValue>(options[0]);

  // for dropdown
  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState(null);
  const items = useMemo(() => {
    setSelected(null);
    return dropDownEndPoint[tag.label];
  }, [tag.label]);

  // for flatList
  const flatListRef = useRef<FlatList>(null);
  const renderTag = useCallback(
    ({item}: ListRenderItemInfo<KeyValue>) => {
      const {label, value} = item;
      const isSelected: boolean = tag.value === value;
      const _onPress = () => {
        setTag(item);
        if (flatListRef.current) {
          flatListRef.current.scrollToItem({animated: true, item, viewOffset: 16});
        }
      };
      return (
        <Pressable
          onPress={_onPress}
          style={[
            styles.tagItemContainer,
            isSelected && styles.tagItemSelectContainer,
          ]}>
          <View style={[styles.tagMark, styles.tagSelectMark]} />
          <Text style={[styles.tagText, isSelected && styles.tagTextSelected]}>
            {label}
          </Text>
        </Pressable>
      );
    },
    [tag.value],
  );

  const _onDate = () => {
    Toast.show({
      type: 'success',
      text1: 'Show buttonsheet to choose date query',
      position: 'bottom',
    });
  };

  const _onHelp = () => {
    Toast.show({
      type: 'success',
      text1: 'Show buttonsheet to explain endpoint',
      position: 'bottom',
    });
  };

  return (
    <View style={styles.container}>
      <View
        style={[styles.searchContainer, inInput && styles.searchInputActive]}>
        <TextInput
          style={[styles.searchInput]}
          numberOfLines={1}
          placeholder={'Enter searching word'}
          placeholderTextColor={'#787878'}
          value={values}
          onChangeText={setValues}
          onFocus={isIn}
          onBlur={isOut}
        />
        <View>
          <DropDownPicker
            placeholder="Select endpoint"
            placeholderStyle={styles.dropdownPlaceholder}
            labelStyle={styles.dropdownLabel}
            style={styles.dropdown}
            setValue={setSelected}
            value={selected}
            dropDownContainerStyle={styles.dropDownContainer}
            items={items}
            open={open}
            setOpen={setOpen}
          />
        </View>
      </View>
      <View style={styles.hintContainer}>
        <Text onPress={_onDate} style={styles.hintText}>
          Date: {0}
        </Text>
        <Pressable style={styles.row} onPress={_onHelp} hitSlop={20}>
          <QuestionSVG height={15} width={15} fill={'#000'} />
          <Text style={styles.hintText}>What is search endpoint ?</Text>
        </Pressable>
      </View>

      <View>
        <FlatList
          ref={flatListRef}
          contentContainerStyle={styles.tagContent}
          showsHorizontalScrollIndicator={false}
          style={styles.tagContainer}
          keyExtractor={item => item.value.toString()}
          horizontal
          data={options}
          renderItem={renderTag}
        />
      </View>

    </View>
  );
};

export default SearchTabView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
  },
  searchContainer: {
    flexDirection: 'row',
    textAlign: 'center',
    gap: 8,
    marginHorizontal: 12,
    paddingStart: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#00000019',
    color: '#000',
  },
  row: {
    flexDirection: 'row',
    gap: 4,
  },
  searchInput: {
    flex: 1,
  },
  searchInputActive: {
    borderColor: '#0246C3FF',
  },
  titleDrop: {
    flex: 1,
    fontSize: 7,
    marginTop: 3,
    textAlign: 'right',
    fontWeight: 700,
    textTransform: 'uppercase',
  },
  dropdown: {
    borderWidth: 0,
    width: 140,
    backgroundColor: '#fff',
  },
  dropdownPlaceholder: {
    fontSize: 12,
    textAlign: 'right',
    color: '#666',
  },
  dropdownLabel: {
    fontSize: 12,
    color: '#0246C3',
    textAlign: 'right',
  },
  hintContainer: {
    justifyContent: 'space-between',
    paddingVertical: 3,
    marginHorizontal: 22,
    marginTop: 8,
    flexDirection: 'row',
    gap: 4,
  },
  tagContainer: {
    marginTop: 16,
    marginBottom: 8,
  },
  tagContent: {
    paddingStart: 16,
    paddingEnd: 12,
    gap: 8,
  },
  hintText: {fontSize: 12, lineHeight: 14, fontWeight: 500},
  tagItemContainer: {
    backgroundColor: 'rgba(220,220,220,0.8)',
    alignSelf: 'center',
    alignItems: 'center',
    gap: 4,
    flexDirection: 'row',
    paddingVertical: 4,
    paddingStart: 10,
    paddingEnd: 14,
    borderWidth: 2,
    borderRadius: 16,
    borderColor: '#DCDCDCFF',
  },
  tagItemSelectContainer: {
    backgroundColor: '#fff',
    borderColor: '#515ece',
  },
  tagMark: {
    width: 14,
    height: 14,
    borderRadius: 10,
    backgroundColor: '#b2d8ef',
  },
  tagSelectMark: {
    backgroundColor: '#515ece',
  },
  tagText: {
    fontSize: 14,
    fontWeight: 700,
    textTransform: 'capitalize',
    color: '#838383',
  },
  tagTextSelected: {
    color: '#000000',
  },
  dropDownContainer: {
    marginTop: 5,
    borderWidth: 1,
    borderColor: '#00000019',
  },
});
