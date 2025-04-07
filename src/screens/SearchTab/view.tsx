import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {ArrowLoadSVG, CalendarSVG, QuestionSVG} from '../../assets/svg';
import {KeyValue} from '../../navigation';
import {dropDownEndPoint, options, SEARCH_TAG} from './utils.ts';
import DropDownPicker from 'react-native-dropdown-picker';
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import {RePressable} from '../../../App.tsx';
import {Controller, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {
  SEARCH_FORM_FIELDS,
  searchFormSchema,
  SearchFormValue,
} from './schema.ts';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import {FlashList} from '@shopify/flash-list';
import {EPdescript} from './mock.ts';

const SearchTabView = () => {
  // for search keyword
  const [search, setSearch] = useState<string>('');
  const [inInput, setInInput] = useState<boolean>(false);
  const isIn = () => setInInput(true);
  const isOut = () => setInInput(false);
  const [tag, setTag] = useState<KeyValue>(options[0]);
  const [numberOfDate, setNumberOfDate] = useState<number>(0);

  // state for form
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
    watch,
  } = useForm({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {startDate: '', endDate: ''},
  });
  const watchFields = watch([
    SEARCH_FORM_FIELDS.START_DATE,
    SEARCH_FORM_FIELDS.END_DATE,
  ]);
  const dateType = useRef<
    (typeof SEARCH_FORM_FIELDS)[keyof typeof SEARCH_FORM_FIELDS]
  >(SEARCH_FORM_FIELDS.START_DATE);
  const _onHidePick = () => setShowPicker(false);
  const handleSetDate = (
    date: Date,
    field: (typeof SEARCH_FORM_FIELDS)[keyof typeof SEARCH_FORM_FIELDS],
  ) => {
    setValue(field, date.getTime().toString());
    _onHidePick();
  };
  const onStartPick = () => {
    dateType.current = SEARCH_FORM_FIELDS.START_DATE;
    setShowPicker(true);
  };
  const onEndPick = () => {
    dateType.current = SEARCH_FORM_FIELDS.END_DATE;
    setShowPicker(true);
  };
  const onConfirmPick = (date: Date) => {
    handleSetDate(date, dateType.current);
  };
  const _onSubmit = (data: SearchFormValue) => {
    _onHide();
    const n = moment(+data.endDate).diff(moment(+data.startDate), 'days');
    setNumberOfDate(n + 1);
  };

  // for dropdown
  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState(null);
  const items = useMemo(() => {
    setSelected(null);
    return dropDownEndPoint[tag.label];
  }, [tag.label]);

  // for flatList
  const flatListRef = useRef<FlatList>(null);
  const renderTag = useCallback(
    ({item}: ListRenderItemInfo<KeyValue>) => {
      const {label, value} = item;
      const isSelected: boolean = tag.value === value;
      const _onPress = () => {
        setTag(item);
        if (flatListRef.current) {
          flatListRef.current.scrollToItem({
            animated: true,
            item,
            viewOffset: 16,
          });
        }
      };
      return (
        <Pressable
          onPress={_onPress}
          style={[
            styles.tagItemContainer,
            isSelected && styles.tagItemSelectContainer,
          ]}>
          <View style={[styles.tagMark, isSelected && styles.tagSelectMark]} />
          <Text style={[styles.tagText, isSelected && styles.tagTextSelected]}>
            {label}
          </Text>
        </Pressable>
      );
    },
    [tag.value],
  );
  const [canLoad, setCanLoad] = useState<boolean>(true);
  const rotateValue = useSharedValue(0);
  const animatedRotate = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: withTiming(
          `${rotateValue.value}deg`,
          {duration: 1000},
          finished => {
            if (finished) {
              runOnJS(setCanLoad)(true);
            }
          },
        ),
      },
    ],
  }));
  const renderHeader = useCallback(() => {
    const _onPress = () => {
      setCanLoad(false);
      rotateValue.value += 360;
    };
    return (
      <View style={styles.headerContainer}>
        <Pressable
          disabled={!canLoad}
          onPress={_onPress}
          style={styles.reloadButton}>
          <Text style={styles.reloadButtonText}>Reload</Text>
          <Animated.View style={animatedRotate}>
            <ArrowLoadSVG
              viewBox={'0 0 24 24'}
              width={16}
              height={16}
              fill={'#515ece'}
            />
          </Animated.View>
        </Pressable>
      </View>
    );
  }, [animatedRotate, canLoad, rotateValue]);

  // state for bottom sheet
  const bottomSheetRef = useRef<BottomSheet>(null);
  const endPointRef = useRef<BottomSheet>(null);
  const _onHide = () => {
    bottomSheetRef.current?.close();
  };
  const _onShow = () => {
    endPointRef.current?.close();
    bottomSheetRef.current?.expand();
  };
  const _onEPBottomSheetShow = () => {
    bottomSheetRef.current?.close();
    endPointRef.current?.expand();
  };
  const [pressable, setPressable] = useState<boolean>(false);

  useEffect(() => {
    setPressable(watchFields[0] !== '' && watchFields[1] !== '');
  }, [watchFields]);

  const animatedButton = useAnimatedStyle(() => ({
    backgroundColor: pressable
      ? withDelay(300, withTiming('#515ece'))
      : withTiming('#8f97dd'),
    color: pressable
      ? withDelay(300, withTiming('#ffffff'))
      : withTiming('#636363'),
  }));

  return (
    <View style={styles.container}>
      <View
        style={[styles.searchContainer, inInput && styles.searchInputActive]}>
        <TextInput
          style={[styles.searchInput]}
          numberOfLines={1}
          placeholder={'Enter searching word'}
          placeholderTextColor={'#787878'}
          value={search}
          onChangeText={setSearch}
          onFocus={isIn}
          onBlur={isOut}
        />
        <View>
          <DropDownPicker
            placeholder="Select endpoint"
            placeholderStyle={styles.dropdownPlaceholder}
            labelStyle={styles.dropdownLabel}
            style={styles.dropdown}
            setValue={setSelected}
            value={selected}
            dropDownContainerStyle={styles.dropDownContainer}
            items={items}
            open={open}
            setOpen={setOpen}
          />
        </View>
      </View>
      <View style={styles.hintContainer}>
        <Text onPress={_onShow} style={styles.hintText}>
          Date: {numberOfDate}
        </Text>
        <Pressable
          style={styles.row}
          onPress={_onEPBottomSheetShow}
          hitSlop={20}>
          <QuestionSVG height={15} width={15} fill={'#000'} />
          <Text style={styles.hintText}>What is search endpoint ?</Text>
        </Pressable>
      </View>

      <View>
        <FlatList
          ref={flatListRef}
          contentContainerStyle={styles.tagContent}
          showsHorizontalScrollIndicator={false}
          style={styles.tagContainer}
          keyExtractor={item => item.value.toString()}
          horizontal
          data={options}
          renderItem={renderTag}
        />
      </View>

      <FlashList
        contentContainerStyle={styles.searchContent}
        ListHeaderComponent={renderHeader}
        data={[]}
        renderItem={() => {
          return <View />;
        }}
      />

      <BottomSheet
        style={styles.sheetView}
        enablePanDownToClose={true}
        enableDynamicSizing={false}
        ref={bottomSheetRef}
        index={-1}
        snapPoints={['35%']}>
        <BottomSheetView>
          <View>
            <Text style={styles.dateTitle}>Start Date</Text>
            <Controller
              control={control}
              name={'startDate'}
              render={({field: {value}}) => {
                return (
                  <Pressable
                    onPress={onStartPick}
                    style={styles.dateFieldInput}>
                    <Text style={styles.dateDisplay}>
                      {value
                        ? moment(+value).format('DD/MM/YYYY')
                        : 'Select start date (DD/MM/YYYY)'}
                    </Text>
                    <CalendarSVG fill={'#00000019'} />
                  </Pressable>
                );
              }}
            />
            {errors.startDate && (
              <Text style={styles.dateError}>{errors.startDate.message}</Text>
            )}
          </View>
          <View>
            <Text style={styles.dateTitle}>Start Date</Text>
            <Controller
              control={control}
              name={'endDate'}
              render={({field: {value}}) => {
                return (
                  <Pressable onPress={onEndPick} style={styles.dateFieldInput}>
                    <Text style={styles.dateDisplay}>
                      {value
                        ? moment(+value).format('DD/MM/YYYY')
                        : 'Select end date (DD/MM/YYYY)'}
                    </Text>
                    <CalendarSVG fill={'#00000019'} />
                  </Pressable>
                );
              }}
            />
            {errors.endDate && (
              <Text style={styles.dateError}>{errors.endDate.message}</Text>
            )}
          </View>
          <RePressable
            onPress={handleSubmit(_onSubmit)}
            style={[styles.bottomSheetConfirmButton, animatedButton]}>
            <Animated.Text
              style={[styles.bottomSheetButtonText, animatedButton]}>
              Confirm
            </Animated.Text>
          </RePressable>
        </BottomSheetView>
      </BottomSheet>

      <BottomSheet
        style={styles.sheetView}
        enablePanDownToClose={true}
        enableDynamicSizing={false}
        ref={endPointRef}
        index={-1}
        snapPoints={['75%']}>
        <BottomSheetScrollView
          contentContainerStyle={styles.bottomSheetContent}
          showsVerticalScrollIndicator={false}>
          <View>
            <Text style={styles.endPointTitle}>What is Endpoint</Text>
            <Text style={styles.endPointContext}>{EPdescript}</Text>
            <Text style={styles.endPointTitle}>What endpoint do we have ?</Text>

            <Text style={styles.endPointSubTitle}>{SEARCH_TAG.TECH}</Text>
            <Text style={styles.hintText}>
              Provides details about NASA’s technological advancements,
              including:
            </Text>

            <View style={styles.contentDescriptionContainer}>
              <Text>* Patent: Registered innovations.</Text>
              <Text>* Patent Issue: Issued patents.</Text>
              <Text>* Software: NASA-developed software.</Text>
              <Text>* Spinoff: Technologies adapted for commercial use.</Text>
            </View>

            <Text style={styles.endPointSubTitle}>{SEARCH_TAG.MEDIA}</Text>
            <Text style={styles.hintText}>
              Access to NASA’s media library, including:
            </Text>

            <View style={styles.contentDescriptionContainer}>
              <Text>* Image: Photos from space missions and telescopes.</Text>
              <Text>* Video: NASA videos, documentaries, and launches.</Text>
              <Text>* Image & Video: Both images and videos combined.</Text>
            </View>

            <Text style={styles.endPointSubTitle}>{SEARCH_TAG.EXOPLANETS}</Text>
            <Text style={styles.hintText}>
              Information on planets beyond our solar system, including:
            </Text>

            <View style={styles.contentDescriptionContainer}>
              <Text>* Planet Name: Specific exoplanets discovered.</Text>
              <Text>* Orbit Planet: The stars these exoplanets orbit.</Text>
            </View>

            <Text style={styles.endPointSubTitle}>
              {SEARCH_TAG.SPACE_MISSION}
            </Text>
            <Text style={styles.hintText}>Details about NASA’s missions. </Text>
            <View style={styles.contentDescriptionContainer}>
              <Text>* Media: Images and videos from</Text>
              <Text>
                * Missions & People: Astronauts and personnel involved.
              </Text>
            </View>
          </View>
        </BottomSheetScrollView>
      </BottomSheet>

      <DatePicker
        modal
        maximumDate={new Date()}
        open={showPicker}
        date={new Date()}
        onConfirm={onConfirmPick}
        onCancel={_onHidePick}
      />
    </View>
  );
};

export default SearchTabView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
  },
  searchContainer: {
    flexDirection: 'row',
    textAlign: 'center',
    gap: 8,
    marginHorizontal: 12,
    paddingStart: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#00000019',
    color: '#000',
  },
  row: {
    flexDirection: 'row',
    gap: 4,
  },
  bottomSheetContent: {
    paddingBottom: 30,
    paddingTop: 15,
    marginTop: 10,
  },
  searchInput: {
    flex: 1,
  },
  searchInputActive: {
    borderColor: '#0246C3FF',
  },
  titleDrop: {
    flex: 1,
    fontSize: 7,
    marginTop: 3,
    textAlign: 'right',
    fontWeight: 700,
    textTransform: 'uppercase',
  },
  dropdown: {
    borderWidth: 0,
    width: 140,
    backgroundColor: '#fff',
  },
  dropdownPlaceholder: {
    fontSize: 12,
    textAlign: 'right',
    color: '#666',
  },
  dropdownLabel: {
    fontSize: 12,
    color: '#0246C3',
    textAlign: 'right',
  },
  hintContainer: {
    justifyContent: 'space-between',
    paddingVertical: 3,
    marginHorizontal: 22,
    marginTop: 8,
    flexDirection: 'row',
    gap: 4,
  },
  tagContainer: {
    marginTop: 16,
    marginBottom: 8,
  },
  tagContent: {
    paddingStart: 16,
    paddingEnd: 12,
    gap: 8,
  },
  hintText: {fontSize: 12, lineHeight: 14, fontWeight: 700},
  tagItemContainer: {
    backgroundColor: 'rgba(220,220,220,0.8)',
    alignSelf: 'center',
    alignItems: 'center',
    gap: 6,
    flexDirection: 'row',
    paddingVertical: 4,
    paddingStart: 10,
    paddingEnd: 14,
    borderWidth: 2,
    borderRadius: 16,
    borderColor: '#DCDCDCFF',
  },
  tagItemSelectContainer: {
    backgroundColor: '#fff',
    borderColor: '#515ece',
  },
  tagMark: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: '#b2d8ef',
  },
  tagSelectMark: {
    backgroundColor: '#515ece',
  },
  tagText: {
    fontSize: 14,
    fontWeight: 700,
    textTransform: 'capitalize',
    color: '#838383',
  },
  tagTextSelected: {
    color: '#000000',
  },
  dropDownContainer: {
    marginTop: 5,
    borderWidth: 1,
    borderColor: '#00000019',
  },
  sheetView: {
    marginHorizontal: 12,
  },
  bottomSheetConfirmButton: {
    paddingVertical: 10,
    marginTop: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  dateTitle: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 700,
    marginBottom: 4,
    marginTop: 12,
  },
  endPointTitle: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: 700,
    marginBottom: 4,
    marginTop: 12,
  },
  endPointSubTitle: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 700,
    marginTop: 8,
  },
  endPointContext: {
    textAlign: 'justify',
    fontSize: 14,
    lineHeight: 18,
    fontWeight: 500,
  },
  dateFieldInput: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderColor: '#00000019',
    borderRadius: 6,
  },
  dateDisplay: {
    flex: 1,
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 20,
    color: '#0000007F',
  },
  bottomSheetButtonText: {
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'center',
    fontWeight: 600,
    textTransform: 'capitalize',
  },
  dateError: {color: '#ff4747', marginTop: 5, fontSize: 10, marginStart: 5},
  contentDescriptionContainer: {
    paddingStart: 18,
    paddingEnd: 8,
    marginTop: 2,
  },
  headerContainer: {
    alignItems: 'flex-end',
    marginHorizontal: 6,
    marginTop: 15,
    marginBottom: 8,
  },
  reloadButton: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    paddingVertical: 3,
    paddingHorizontal: 6,
  },
  reloadButtonText: {
    fontSize: 14,
    fontWeight: 700,
    lineHeight: 20,
  },
  searchContent: {
    paddingHorizontal: 12,
    paddingBottom: 48,
  },
});
