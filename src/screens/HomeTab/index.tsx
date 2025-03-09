import * as React from 'react';
import {useEffect} from 'react';
import HomeTabView from './view';
import {useDispatch, useSelector} from 'react-redux';
import {selectAPOD} from '../../redux/selectors/homeSelector.ts';
import {fetchAPOD} from '../../redux/actions/HomeAction.ts';

export default () => {
  const apod = useSelector(selectAPOD);
  const dispatch = useDispatch();

  useEffect(() => {
    if (apod.title === '') {
        console.log('call');
      dispatch(fetchAPOD('planetary/apod'));
    }
  }, [apod, dispatch]);

    console.log(apod);
  return <HomeTabView data={apod} />;
};
