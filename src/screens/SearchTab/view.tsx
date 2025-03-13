import React, { useState } from 'react';
import {View, StyleSheet, TextInput, Text} from 'react-native';

const SearchTabView = () => {
 const [value, setValue] = useState<string>('');
 const [inInput, setInInput] = useState<boolean>(false);
 const isIn = () => setInInput(true);
 const isOut = () => setInInput(false);
 return (
  <View style={styles.container}>
   <View style={[styles.searchContainer,  inInput && styles.searchInputActive]}>
    <TextInput style={[styles.searchInput ]} placeholder={'Enter searching word'} value={value} onChangeText={setValue} onFocus={isIn} onBlur={isOut} />
    <Text>Search endpoint</Text>
   </View>
  </View>
 );
};

export default SearchTabView;

const styles = StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: '#fff',
 },
 searchContainer: {
  flexDirection:'row',
  gap: 4,
  paddingHorizontal: 12,
  paddingVertical: 8,
  borderRadius: 6,
  borderWidth: 1,
  borderColor: 'rgba(0,0,0,0.1)',
  color: '#000',
 },
 searchInput: {
  flex: 1,
 },
 searchInputActive: {
  borderColor: 'rgb(2,70,195)',
 },
});
