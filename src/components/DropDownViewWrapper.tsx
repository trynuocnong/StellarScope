import React from 'react';
import { View, StyleSheet } from 'react-native';

export interface DropDownWrapperProps {
    children: React.ReactNode
}
export default function ({children}: DropDownWrapperProps){
 return (
  <View children={children}/>
 );
};


const styles = StyleSheet.create({});
