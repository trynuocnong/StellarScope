import React, {useCallback, useState} from 'react';
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

const options: KeyValue[] = [
  {label: 'Tech & Innovations', value: 0},
  {label: 'Exoplanets', value: 1},
  {label: 'Asteroids & Comets', value: 2},
  {label: 'Space Missions', value: 3},
];

const SearchTabView = () => {
  const [values, setValues] = useState<string>('');
  const [inInput, setInInput] = useState<boolean>(false);
  const isIn = () => setInInput(true);
  const isOut = () => setInInput(false);
  const [tag, setTag] = useState<KeyValue>(options[0]);

  const renderTag = useCallback(
    ({item}: ListRenderItemInfo<KeyValue>) => {
      const {label, value} = item;
      const isSelected: boolean = tag.value === value;
      const _onPress = () => {
        setTag(item);
      };
      return (
        <Pressable onPress={_onPress}
          style={[styles.tagItemContainer, isSelected && styles.tagItemSelectContainer]}>
          <View
            style={[styles.tagMark, isSelected && styles.tagSelectMark]}
          />
          <Text>{label}</Text>
        </Pressable>
      );
    },
    [tag.value],
  );

  return (
    <View style={styles.container}>
      <View
        style={[styles.searchContainer, inInput && styles.searchInputActive]}>
        <TextInput
          style={[styles.searchInput]}
          placeholder={'Enter searching word'}
          placeholderTextColor={'#787878'}
          value={values}
          onChangeText={setValues}
          onFocus={isIn}
          onBlur={isOut}
        />
        <Text style={styles.textDrop}>Search endpoint</Text>
      </View>
      <Pressable
        onPress={() => {
          Toast.show({
            type: 'warning',
            text1: 'Enter searching word',
          });
        }}
        hitSlop={20}
        style={styles.hintContainer}>
        <QuestionSVG height={15} width={15} fill={'#000'} />
        <Text style={styles.hintText}>What is search endpoint ?</Text>
      </Pressable>

      <View>
        <FlatList
          contentContainerStyle={styles.tagContent}
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
    paddingHorizontal: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: 'rgba(0,0,0,0.1)',
    color: '#000',
  },
  searchInput: {
    flex: 1,
  },
  searchInputActive: {
    borderColor: 'rgb(2,70,195)',
  },
  textDrop: {
    fontSize: 10,
    textAlignVertical: 'center',
    fontWeight: 700,
    textTransform: 'capitalize',
  },
  hintContainer: {
    alignSelf: 'flex-end',
    paddingVertical: 3,
    marginHorizontal: 22,
    marginTop: 5,
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
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#b2d8ef',
  },
  tagSelectMark: {
    backgroundColor: '#515ece',
  },
});
