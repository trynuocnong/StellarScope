import React, {useRef, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS, THEME_COLORS} from '../../../utils/resources/colors.ts';
import {SafeAreaView} from 'react-native-safe-area-context';
import DatePicker from 'react-native-date-picker';
import {Control, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {apodSchema} from '../schemas.ts';
import moment from 'moment/moment';
import {APODFormParams} from '../type.ts';
import {APODRes} from '../../../utils/DTO';
import AxiosInstance from '../../../helper/AxiosInstance.ts';
import {API_ENDPOINT, convertAPI} from '../../../utils/APIUtils.ts';
import {baseAPIParams} from '../../../navigation/RootApp.tsx';
import CampfireSVG from '../../../assets/svg/campfire.tsx';
import FormInput from '../../../components/FormInput.tsx';

const callApi = async (
  startDate: number,
  endDate: number,
  count: number = 0,
): Promise<APODRes[]> => {
  if (count) {
    const {data} = await AxiosInstance.get(convertAPI(API_ENDPOINT.APOD), {
      params: {
        ...baseAPIParams,
        count,
      },
    });
    return data;
  }
  const {data} = await AxiosInstance.get(convertAPI(API_ENDPOINT.APOD), {
    params: {
      ...baseAPIParams,
      start_date: moment(startDate).format('YYYY-MM-DD'),
      end_date: moment(endDate).format('YYYY-MM-DD'),
    },
  });
  return data;
};

const RenderHeader = ({control}: {control: Control<APODFormParams>}) => {
  return (
    <View style={styles.searchForm}>
      <FormInput
        control={control}
        name="startDate"
        title="Start Date"
        placeholder={`e.g ${moment().subtract(1, 'days').format('YYYY-MM-DD')}`}
      />
      <FormInput
        control={control}
        name="endDate"
        title="End Date"
        placeholder={`e.g ${moment().format('YYYY-MM-DD')}`}
      />
      <FormInput
        control={control}
        name="count"
        title="Count (optional)"
        titleType="inside"
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.searchButton}>
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>
    </View>
  );
};

const renderEmpty = () => {
  return (
    <View style={styles.emptyItemContainer}>
      <CampfireSVG width={336} height={336} />
      <Text style={styles.emptyItemText}>The sky look clear today</Text>
    </View>
  );
};

export default function () {
  const dateType = useRef<'startDate' | 'endDate'>('startDate');
  const [display, setDisplay] = useState<boolean>(false);
  const startType = () => {
    dateType.current = 'startDate';
    setDisplay(true);
  };
  const endType = () => {
    dateType.current = 'endDate';
    setDisplay(true);
  };

  const {control, setValue, watch, getValues} = useForm<APODFormParams>({
    resolver: zodResolver(apodSchema),
    defaultValues: {startDate: 0, endDate: 0, count: 0},
  });

  const onConfirmPick = (date: Date) => {
    setValue(dateType.current, date.getTime());
    _onHidePick();
  };
  const _onHidePick = () => setDisplay(false);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={[styles.container, styles.content]}>
        <FlatList
          data={[]}
          ListHeaderComponent={<RenderHeader control={control} />}
          renderItem={() => {
            return <View />;
          }}
        />

        <DatePicker
          modal
          maximumDate={
            dateType.current === 'endDate'
              ? new Date()
              : getValues().endDate !== 0
              ? new Date(getValues().endDate)
              : new Date()
          }
          mode={'date'}
          open={display}
          date={
            dateType.current === 'startDate'
              ? getValues().endDate !== 0
                ? new Date(getValues().startDate)
                : new Date()
              : getValues().endDate !== 0
              ? new Date(getValues().endDate)
              : new Date()
          }
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
    backgroundColor: THEME_COLORS.background,
  },
  content: {
    paddingTop: 8,
    paddingHorizontal: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  switchText: {
    fontSize: 16,
    textTransform: 'uppercase',
    color: COLORS.neutral['100'],
    fontWeight: 'bold',
    marginEnd: 10,
  },
  searchBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 32,
  },
  textCountInput: {
    flex: 1,
    paddingStart: 12,
    fontWeight: 700,
    fontSize: 16,
    backgroundColor: COLORS.neutral['100'],
    borderRadius: 5,
  },
  textCount: {
    fontSize: 14,
    lineHeight: 14,
    textAlignVertical: 'center',
    height: 30,
    fontWeight: 700,
    width: 30,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: COLORS.accent['200'],
  },
  dateError: {
    color: COLORS.error['100'],
    marginTop: 5,
    fontSize: 10,
    marginStart: 5,
  },
  dateStyle: {
    fontSize: 14,
    fontWeight: 700,
    width: 100,
    height: 30,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: COLORS.neutral['100'],
  },
  itemContainer: {
    alignSelf: 'center',
    elevation: 10,
    shadowOpacity: 0.8,
    shadowColor: COLORS.neutral['50'],
    marginBottom: 8,
  },
  emptyItemContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    height: 500,
  },
  emptyItemText: {
    color: COLORS.neutral['200'],
    fontSize: 20,
    fontWeight: 700,
  },
  flashListContent: {
    paddingTop: 18,
    paddingBottom: 32,
  },
  searchInput: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: 'white',
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: THEME_COLORS.button.primary.accent,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 4,
    marginLeft: 8,
  },
  searchButtonText: {
    color: COLORS.neutral['100'],
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 8,
  },
  searchForm: {
    backgroundColor: COLORS.primary['10'],
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.primary['50'],
  },
});
