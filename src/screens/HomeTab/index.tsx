import * as React from 'react';
import {useEffect} from 'react';
import HomeTabView from './view';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectAPOD, selectEarthPhotos,
  selectMarsRoverPhotos,
} from '../../redux/selectors/homeSelector.ts';
import {
  fetchAPOD, fetchEarthImagesAction,
  fetchMarsRoverPhotosAction,
} from '../../redux/actions/HomeAction.ts';
import {API_KEY} from '@env';
import {API_ENDPOINT} from '../../utils/APIUtils.ts';

const params = {
  api_key: API_KEY,
};

export default () => {
  const apod = useSelector(selectAPOD);
  const msrp = useSelector(selectMarsRoverPhotos);
  const earthImage = useSelector(selectEarthPhotos);
  const dispatch = useDispatch();

  useEffect(() => {
    if (apod.title === '') {
      dispatch(fetchAPOD(API_ENDPOINT.APOD, params));
    }
  }, [apod, dispatch]);

  useEffect(() => {
    if (msrp.photos.length === 0) {
      dispatch(
          fetchMarsRoverPhotosAction(
              API_ENDPOINT.MSRP,
              {...params, sol: 1},
          ),
      );
    }
  }, [dispatch, msrp.photos.length]);

  useEffect(() => {
    if (earthImage.length === 0) {
      dispatch(
          fetchEarthImagesAction(
              API_ENDPOINT.EARTH_IMAGE,
              params,
          ),
      );
    }
  }, [dispatch, earthImage.length]);

  return <HomeTabView apod={apod} msrp={msrp} earthImage={earthImage} />;
};
