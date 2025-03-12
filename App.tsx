if (__DEV__) {
    require('./ReactotronConfig');
}
import store from './src/redux/store.ts';
import React from 'react';
import RootApp from './src/navigation/RootApp.tsx';
import {Provider} from 'react-redux';

const App = () => {
  return (
    <Provider store={store}>
      <RootApp />
    </Provider>
  );
};

export default App;
