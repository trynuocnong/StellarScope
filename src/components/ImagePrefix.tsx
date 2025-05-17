import React from 'react';
import FastImage from 'react-native-fast-image';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS} from '../utils/resources/colors.ts';

export type ImagePrefixProps = React.ComponentProps<typeof FastImage> & {
  errorNode: React.ReactNode;
  loadingNode?: React.ReactNode;
};

const ImagePrefix = ({
  onLoadStart,
  onLoadEnd,
  onError,
  errorNode,
  loadingNode = (
    <ActivityIndicator color={COLORS.primary['400']} size="large" />
  ),
  ...rest
}: ImagePrefixProps) => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [reloadKey, setReloadKey] = React.useState(0);

  const startLoading = () => {
    setLoading(true);
    setError(false);
    onLoadStart && onLoadStart();
  };
  const endLoading = () => {
    setLoading(false);
    onLoadEnd && onLoadEnd();
  };
  const handleError = () => {
    setError(true);
    onError && onError();
  };
  const retry = () => {
    setError(false);
    setReloadKey(reloadKey + 1);
  };
  return (
    <FastImage
      onLoadStart={startLoading}
      onLoadEnd={endLoading}
      onError={handleError}
      {...rest}>
      {error ? (
        <TouchableOpacity onPress={retry} style={styles.contentContainer}>
          {errorNode}
        </TouchableOpacity>
      ) : (
        <></>
      )}

      {loading ? (
        <View style={styles.contentContainer}>{loadingNode}</View>
      ) : (
        <></>
      )}
    </FastImage>
  );
};

export default ImagePrefix;

const styles = StyleSheet.create({
  contentContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
