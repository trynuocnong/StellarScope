import React from 'react';
import { View, StyleSheet } from 'react-native';
import TechTransferColItem from '../TechTransferColItem';

const emptyItem = [
  'Empty',
  'Empty',
  'Empty',
  'Empty',
  'Empty',
  'Empty',
  'Empty',
  'Empty',
  'Empty',
  'Empty',
  'Empty',
  'Empty',
  'Empty',
  'Empty',
];
export default function EmptyRowV1(props: any) {
 return (
  <View style={styles.container}>
    <TechTransferColItem data={emptyItem} />
    <TechTransferColItem data={emptyItem} />
    <TechTransferColItem data={emptyItem} />
    <TechTransferColItem data={emptyItem} />
    <TechTransferColItem data={emptyItem} />
  </View>
 );
};


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
  },
});
