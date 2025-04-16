import React, {useRef, useState} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {COLORS} from '../../../utils/resources/colors.ts';
import {SafeAreaView} from 'react-native-safe-area-context';
import DatePicker from 'react-native-date-picker';
import {Controller, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {apodSchema} from '../schemas.ts';
import moment from 'moment/moment';
import AppSwitchExt from '../../../components/AppSwitchExt.tsx';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import {useQuery} from '@tanstack/react-query';
import {APODFormParams} from '../type.ts';
import {APODRes} from '../../../utils/DTO';
import AxiosInstance from '../../../helper/AxiosInstance.ts';
import {API_ENDPOINT, convertAPI} from '../../../utils/APIUtils.ts';
import {baseAPIParams} from '../../../navigation/RootApp.tsx';
import {FlashList, ListRenderItemInfo} from '@shopify/flash-list';
import APODItem from '../../../components/APODItem.tsx';
import CampfireSVG from '../../../assets/svg/campfire.tsx';
import {navRef, ROUTES} from '../../../navigation';

const callApi = async ({
  queryKey,
}: {
  queryKey: [string, APODFormParams];
}): Promise<APODRes[]> => {
  console.log('call api');
  const [, params] = queryKey;

  if (params.useCount) {
    const {data} = await AxiosInstance.get(convertAPI(API_ENDPOINT.APOD), {
      params: {
        ...baseAPIParams,
        count: params.count,
      },
    });
    return data;
  } else {
    const {data} = await AxiosInstance.get(convertAPI(API_ENDPOINT.APOD), {
      params: {
        ...baseAPIParams,
        start_date: moment(params.startDate).format('YYYY-MM-DD'),
        end_date: moment(params.endDate).format('YYYY-MM-DD'),
      },
    });
    return data;
  }
};

const emptyArr: APODRes[] = [];

const renderItem = (data: ListRenderItemInfo<APODRes>) => {
  const _onPress = () => {
    navRef.current?.navigate(ROUTES.DETAIL_APOD_SCREEN, {data: data.item});
  };

  return (
    <Pressable
      onPress={_onPress}
      style={styles.itemContainer}>
      <APODItem {...data.item} />
    </Pressable>
  );
};

const renderEmpty = () => {
  return (
    <View
      style={styles.emptyItemContainer}>
      <CampfireSVG width={336} height={336} />
      <Text
        style={styles.emptyItemText}>
        The sky look clear today
      </Text>
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

  const {control, setValue, watch, getValues} = useForm({
    resolver: zodResolver(apodSchema),
    defaultValues: {startDate: 0, endDate: 0, useCount: false, count: 0},
  });
  const count = watch('count');
  const useCount = watch('useCount');
  const startDate = watch('startDate');
  const endDate = watch('endDate');
  const updateChecked = (): void => {
    setValue('useCount', !getValues().useCount);
  };
  const queryEnabled = useCount ? count > 0 : startDate !== 0 && endDate !== 0;

  const onConfirmPick = (date: Date) => {
    setValue(dateType.current, date.getTime());
    _onHidePick();
  };
  const _onHidePick = () => setDisplay(false);

  const {data, isLoading, error} = useQuery({
    queryKey: [
      'apodData',
      {
        useCount,
        count,
        startDate,
        endDate,
      },
    ],
    queryFn: callApi,
    enabled: queryEnabled,
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.container, styles.content]}>
        <View style={styles.switchContainer}>
          <Text onPress={updateChecked} style={styles.switchText}>
            Time leap
          </Text>
          <AppSwitchExt checked={useCount} updateChecked={updateChecked} />
        </View>

        {useCount ? (
          <Animated.View
            entering={FadeIn.duration(500)}
            exiting={FadeOut.duration(300)}
            style={styles.searchBarContainer}>
            <TextInput
              style={styles.textCountInput}
              keyboardType={'numeric'}
              autoFocus={true}
              placeholder={'Total Search Date'}
            />
          </Animated.View>
        ) : (
          <Animated.View
            entering={FadeIn.duration(500)}
            exiting={FadeOut.duration(300)}
            style={styles.searchBarContainer}>
            <Controller
              control={control}
              name={'startDate'}
              render={({field: {value}}) => {
                return (
                  <Pressable onPress={startType}>
                    <Text style={styles.dateStyle}>
                      {value
                        ? moment(value).format('DD/MM/YYYY')
                        : 'Start date'}
                    </Text>
                  </Pressable>
                );
              }}
            />

            <Text style={styles.textCount}>
              {getValues().startDate !== 0 && getValues().endDate !== 0
                ? moment(getValues().endDate).diff(
                    getValues().startDate,
                    'days',
                  ) + 1
                : 0}
            </Text>
            <Controller
              control={control}
              name={'endDate'}
              render={({field: {value}}) => {
                return (
                  <Pressable onPress={endType}>
                    <Text style={styles.dateStyle}>
                      {value ? moment(value).format('DD/MM/YYYY') : 'End date'}
                    </Text>
                  </Pressable>
                );
              }}
            />
          </Animated.View>
        )}

        <FlashList
          ListEmptyComponent={renderEmpty}
          contentContainerStyle={styles.flashListContent}
          estimatedItemSize={448}
          data={data || emptyArr}
          renderItem={renderItem}
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
    backgroundColor: COLORS.primary['600'],
  },
  content: {
    paddingTop: 8,
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
});
