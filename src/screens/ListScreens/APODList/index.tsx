import React, {useRef, useState} from 'react';
import { StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../../../utils/resources/colors.ts';
import {SafeAreaView} from 'react-native-safe-area-context';
import DatePicker from 'react-native-date-picker';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {apodSchema} from '../schemas.ts';
import {SearchFormValue} from '../../SearchTab/schema.ts';
import moment from 'moment/moment';

export default function () {
  const dateType = useRef('StartDate');
  const [display, setDisplay] = useState<boolean>(false);
  const startType = () => {
    dateType.current = 'StartDate';
    setDisplay(true);
  };
  const endType = () => {
    dateType.current = 'EndDate';
    setDisplay(true);
  };

  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
    watch,
  } = useForm({
    resolver: zodResolver(apodSchema),
    defaultValues: {startDate: '', endDate: '', useCount: false, count: 0},
  });

  const onConfirmPick = () => {
  };
  const _onHidePick = () => setDisplay(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.container, styles.content]}>
        <View
          style={styles.searchBarContainer}>
          <Text onPress={startType} style={styles.dateStyle}>DD/MM/YYYY</Text>
          <Text onPress={endType} style={styles.dateStyle}>DD/MM/YYYY</Text>
        </View>

        <DatePicker
          modal
          maximumDate={new Date()}
          mode={'date'}
          open={display}
          date={new Date()}
          onConfirm={onConfirmPick}
          onCancel={_onHidePick}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary['600'],
  },
  content: {
    paddingTop: 8,
  },
  searchBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 32,
  },
  dateStyle: {
    fontSize: 14,
    fontWeight: 700,
    color: COLORS.neutral['100'],
  },
});
