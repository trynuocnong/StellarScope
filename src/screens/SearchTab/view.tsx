import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {QuestionSVG} from '../../assets/svg';
import Toast from 'react-native-toast-message';

const SearchTabView = () => {
  const [value, setValue] = useState<string>('');
  const [inInput, setInInput] = useState<boolean>(false);
  const isIn = () => setInInput(true);
  const isOut = () => setInInput(false);
  return (
    <View style={styles.container}>
      <View
        style={[styles.searchContainer, inInput && styles.searchInputActive]}>
        <TextInput
          style={[styles.searchInput]}
          placeholder={'Enter searching word'}
          placeholderTextColor={'#787878'}
          value={value}
          onChangeText={setValue}
          onFocus={isIn}
          onBlur={isOut}
        />
        <Text style={styles.textDrop}>Search endpoint</Text>
      </View>
      <Pressable onPress={() => {
        Toast.show({
          type: 'warning',
          text1: 'Enter searching word',
        });
      }} hitSlop={20} style={styles.hintContainer}>
        <QuestionSVG height={15} width={15} fill={'#000'} />
        <Text style={styles.hintText}>What is search endpoint ?</Text>
      </Pressable>
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
  hintText: {fontSize: 12, lineHeight: 14, fontWeight: 500},
});
