import React, {useRef, useState} from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
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
import {NASA_API_ENDPOINT, convertNASAAPI} from '../../../utils/APIUtils.ts';
import {baseAPIParams} from '../../../navigation/RootApp.tsx';
import CampfireSVG from '../../../assets/svg/campfire.tsx';
import FormInput from '../../../components/FormInput.tsx';
import FastImage from 'react-native-fast-image';
import {navRef, ROUTES} from '../../../navigation';
import Animated, {SlideInLeft, SlideOutLeft} from 'react-native-reanimated';

const callApi = async (
  startDate: string,
  endDate: string,
  count: number = 0,
): Promise<APODRes[]> => {
  if (count) {
    const {data} = await AxiosInstance.get(convertNASAAPI(NASA_API_ENDPOINT.APOD), {
      params: {
        ...baseAPIParams,
        count,
      },
    });
    return data;
  }
  const {data} = await AxiosInstance.get(convertNASAAPI(NASA_API_ENDPOINT.APOD), {
    params: {
      ...baseAPIParams,
      start_date: startDate,
      end_date: endDate,
    },
  });
  return data;
};

const RenderHeader = ({
  control,
  onSubmitForm,
  isLoading,
}: {
  control: Control<APODFormParams>;
  onSubmitForm: () => void;
  isLoading: boolean;
}) => {
  return (
    <View style={styles.searchSection}>
      <Text style={styles.sectionTitle}>Astronomy Picture of the Day</Text>
      <Text style={styles.sectionSubtitle}>
        Search for stunning space images by date
      </Text>
      <View style={styles.searchForm}>
        <FormInput
          control={control}
          containerStyle={{marginBottom: 8}}
          name="startDate"
          title="Start Date"
          placeholder={`e.g ${moment()
            .subtract(1, 'days')
            .format('YYYY-MM-DD')}`}
        />
        <FormInput
          control={control}
          name="endDate"
          title="End Date"
          placeholder={`e.g ${moment().format('YYYY-MM-DD')}`}
        />
        <FormInput
          control={control}
          containerStyle={{marginTop: 24}}
          name="count"
          title="Count (optional)"
          titleType="inside"
          keyboardType="numeric"
        />

        <TouchableOpacity
          disabled={isLoading}
          onPress={onSubmitForm}
          style={styles.searchButton}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
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

const renderItem = ({item, index}: ListRenderItemInfo<APODRes>) => {
  const goToAPODDetails = () => {
    navRef.current?.navigate(ROUTES.DETAIL_APOD_SCREEN, {data: item});
  };
  return (
    <Animated.View entering={SlideInLeft} exiting={SlideOutLeft}>
      <TouchableOpacity
        onPress={goToAPODDetails}
        key={`${index}_${item.date}_${item.title}`}
        style={styles.resultItem}>
        <FastImage
          source={{uri: item.url}}
          style={styles.resultImage}
          resizeMode="cover"
        />
        <View style={styles.resultContent}>
          <Text style={styles.resultTitle}>{item.title}</Text>
          <Text style={styles.resultDate}>{item.date}</Text>
          <Text style={styles.resultDescription} numberOfLines={2}>
            {item.explanation}
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default function () {
  const dateType = useRef<'startDate' | 'endDate'>('startDate');
  const [display, setDisplay] = useState<boolean>(false);
  const [results, setResults] = useState<APODRes[]>([]);
  const [loading, setLoading] = useState(false);
  const curLoadingApi = useRef(false);
  const curFlatList = useRef<FlatList>(null);
  const startType = () => {
    dateType.current = 'startDate';
    setDisplay(true);
  };
  const endType = () => {
    dateType.current = 'endDate';
    setDisplay(true);
  };

  const onSubmit = async (values: APODFormParams) => {
    if (!curLoadingApi.current) {
      try {
        curLoadingApi.current = true;
        setLoading(true);
        const {startDate, endDate, count} = values;
        const data = await callApi(startDate, endDate, count);
        setLoading(false);
        setResults(data);
        curLoadingApi.current = false;
      } catch (error) {
        setLoading(false);
        console.error('API Error:', error);
        curLoadingApi.current = false;
      }
    }
  };

  const {control, setValue, watch, getValues, handleSubmit} =
    useForm<APODFormParams>({
      resolver: zodResolver(apodSchema),
      defaultValues: {startDate: '', endDate: '', count: 0},
    });

  const onConfirmPick = (date: Date) => {
    setValue(dateType.current, moment(date).format('YYYY-MM-DD'));
    _onHidePick();
  };
  const _onHidePick = () => setDisplay(false);
  const scrollToTop = () => {
    curFlatList.current?.scrollToIndex({index: 0, animated: true});
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={[styles.container]}>
        <FlatList
          data={results}
          keyExtractor={item => item.url}
          removeClippedSubviews={false}
          ListHeaderComponent={
            <RenderHeader
              control={control}
              isLoading={loading}
              onSubmitForm={handleSubmit(onSubmit)}
            />
          }
          renderItem={renderItem}
        />

        <DatePicker
          modal
          // maximumDate={
          //   dateType.current === 'endDate'
          //     ? new Date()
          //     : getValues().endDate !== 0
          //     ? new Date(getValues().endDate)
          //     : new Date()
          // }
          mode={'date'}
          open={display}
          date={new Date()}
          // date={
          //   dateType.current === 'startDate'
          //     ? getValues().endDate !== 0
          //       ? new Date(getValues().startDate)
          //       : new Date()
          //     : getValues().endDate !== 0
          //     ? new Date(getValues().endDate)
          //     : new Date()
          // }
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
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 24,
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.neutral['100'],
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: COLORS.neutral['500'],
    marginBottom: 16,
  },
  searchSection: {
    padding: 16,
  },
  resultItem: {
    flexDirection: 'row',
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    marginHorizontal: 16,
  },
  resultImage: {
    maxWidth: 100,
    flex: 1,
  },
  resultContent: {
    flex: 1,
    padding: 12,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
    marginBottom: 4,
  },
  resultDate: {
    fontSize: 12,
    color: '#a0a0b9',
    marginBottom: 6,
  },
  resultDescription: {
    fontSize: 14,
    color: '#d1d1e0',
    lineHeight: 20,
  },
  resultTypeContainer: {
    backgroundColor: 'rgba(78, 95, 248, 0.2)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  resultType: {
    color: '#4e5ff8',
    fontSize: 12,
    fontWeight: '600',
  },
});
