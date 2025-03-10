import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';

const TechTransferColItem = () => {
  return (
    <View
      style={{
          width: 150,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.1)',
        overflow: 'hidden',
      }}>
      <FastImage
        style={{width: 150, height: 150}}
        source={{
          uri: 'https://ntts-prod.s3.amazonaws.com/t2p/prod/t2media/tops/img/MSC-TOPS-80/SpaceSuit_Roboglove_Prototype_Image_TOPS_80.jpg',
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View style={{width: 150, height: 60, padding: 8, gap: 4, backgroundColor: 'white'}}>
        <Text
          style={{
            fontSize: 12,
            lineHeight: 16,
            fontWeight: 400,
            textTransform: 'capitalize',
          }}>
          sensors
        </Text>
        <Text
          style={{
            fontSize: 16,
            lineHeight: 20,
            fontWeight: 600,
            textTransform: 'uppercase',
          }}>
          LAR-TOPS-351
        </Text>
      </View>
    </View>
  );
};

export default TechTransferColItem;

const styles = StyleSheet.create({});
