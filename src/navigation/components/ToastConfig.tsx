import {ToastConfig} from 'react-native-toast-message/lib/src/types';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';

export const toastConfig: ToastConfig = {
  success: props => (
    <View style={[styles.toastContainer, styles.success]}>
      <Text style={styles.text}>{props.text1}</Text>
    </View>
  ),

  error: props => (
    <View style={[styles.toastContainer, styles.error]}>
      <Text style={styles.text}>{props.text1}</Text>
    </View>
  ),

  detailSuccess: props => (
    <View style={[styles.toastContainer, styles.success]}>
      <Text style={styles.text}>{props.text1}</Text>
      <Text style={styles.subText}>{props.text2}</Text>
    </View>
  ),

  detailError: props => (
    <View style={[styles.toastContainer, styles.error]}>
      <Text style={styles.text}>{props.text1}</Text>
      <Text style={styles.subText}>{props.text2}</Text>
    </View>
  ),

  warning: props => (
    <View style={[styles.toastContainer, styles.warning]}>
      <Text style={styles.text}>{props.text1}</Text>
    </View>
  ),

  detailWarning: props => (
    <View style={[styles.toastContainer, styles.warning]}>
      <Text style={styles.text}>{props.text1}</Text>
      <Text style={styles.subText}>{props.text2}</Text>
    </View>
  ),

  withAction: props => (
    <View style={[styles.toastContainer, styles.action]}>
      <Text style={styles.text}>{props.text1}</Text>
      <Pressable style={styles.actionButton} onPress={props.onPress}>
        <Text style={styles.buttonText}>{props.text2}</Text>
      </Pressable>
    </View>
  ),
};

const styles = StyleSheet.create({
  toastContainer: {
    padding: 12,
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  success: {
    backgroundColor: '#4CAF50', // Green
  },
  error: {
    backgroundColor: '#F44336', // Red
  },
  warning: {
    backgroundColor: '#FFC107', // Yellow
  },
  action: {
    backgroundColor: '#2196F3',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  subText: {
    fontSize: 14,
    color: '#fff',
    marginTop: 4,
  },
  actionButton: {
    backgroundColor: '#fff',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#2196F3',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
