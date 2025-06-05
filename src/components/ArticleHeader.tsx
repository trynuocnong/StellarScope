import React, {ReactNode} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {navRef} from '../navigation';
import {ArrowPrevSVG} from '../assets/svg';
import {COLORS, THEME_COLORS} from '../utils/resources/colors.ts';

export type ArticleHeaderProps = {
  name: string;
  action?: ReactNode[];
};

const ArticleHeader = ({name, action}: ArticleHeaderProps) => {
  const _onBackPress = () => {
    navRef.current?.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Pressable onPress={_onBackPress}>
          <ArrowPrevSVG fill={COLORS.neutral['400']} />
        </Pressable>
        <Text style={styles.titleText}>{name}</Text>
      </View>

      {action && (
        <View style={styles.actionContainer}>
          {action.map((item, index) => (
            <React.Fragment key={index}>{item}</React.Fragment>
          ))}
        </View>
      )}
    </View>
  );
};

export default ArticleHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: THEME_COLORS.background,
  },
  titleContainer: {flexDirection: 'row', gap: 12},
  titleText: {
    fontSize: 20,
    lineHeight: 24,
    fontWeight: 700,
    textTransform: 'capitalize',
    flex: 1,
    color: COLORS.neutral['400'],
  },
  actionContainer: {flexDirection: 'row', gap: 8},
});
