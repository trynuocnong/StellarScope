import * as React from 'react';
import {useEffect} from 'react';
import HomeTabView from './view';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectAPOD, selectEarthPhotos,
  selectMarsRoverPhotos, selectTech,
} from '../../redux/selectors/homeSelector.ts';
import {
  fetchAPOD, fetchEarthImagesAction,
  fetchMarsRoverPhotosAction, fetchTechTransfer,
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
  const tech = useSelector(selectTech);
  const dispatch = useDispatch();

  useEffect(() => {
    if (apod.title === '') {
      dispatch(fetchAPOD(API_ENDPOINT.APOD, params));
    }
  }, [apod, dispatch]);

  useEffect(() => {
    if (tech.length === 0) {
      dispatch(
          fetchTechTransfer(
              API_ENDPOINT.TECH_TRANSFER.PATENT,
              {...params, space: ''},
          ),
      );
    }
  }, [dispatch, tech.length]);

  useEffect(() => {
    if (msrp.length === 0) {
      dispatch(
          fetchMarsRoverPhotosAction(
              API_ENDPOINT.MSRP,
              {...params, sol: 1},
          ),
      );
    }
  }, [dispatch, msrp.length]);

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

  return <HomeTabView apod={apod} tech={tech} marsRP={msrp} earthPhotos={earthImage} />;
};
